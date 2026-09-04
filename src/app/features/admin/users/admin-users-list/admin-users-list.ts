import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { UserResponse } from '../../../../shared/models/user-response';
import { PageResponse } from '../../../../shared/models/page-response';

type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

const statusFilters: StatusFilter[] = ['ALL', 'ACTIVE', 'INACTIVE'];

@Component({
  selector: 'app-admin-users-list',
  imports: [RouterLink],
  templateUrl: './admin-users-list.html',
  styleUrl: './admin-users-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersList {
  private userService = inject(UserService);

  users = signal<UserResponse[]>([]);

  currentPage = signal(0);
  pageSize = signal(20);
  totalPages = signal(0);
  totalElements = signal(0);
  activeFilter = signal<StatusFilter>('ALL');

  statusFilters = statusFilters;

  selectedUser = signal<UserResponse | null>(null);
  showDeleteModal = signal(false);

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  loading = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);

    const status =
      this.activeFilter() === 'ALL' ? undefined : this.activeFilter();

    this.userService.getAll(this.currentPage(), this.pageSize(), 'name,asc', status).subscribe({
      next: (response: PageResponse<UserResponse>) => {
        this.users.set(response.content);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        this.errorMessage.set('No se pudieron cargar los usuarios. Inténtalo nuevamente.');
        this.loading.set(false);
        setTimeout(() => this.errorMessage.set(null), 3000);
      },
    });
  }

  setFilter(filter: StatusFilter): void {
    this.activeFilter.set(filter);
    this.currentPage.set(0);
    this.loadUsers();
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update((page) => page + 1);
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update((page) => page - 1);
      this.loadUsers();
    }
  }

  softDelete(user: UserResponse): void {
    this.selectedUser.set(user);
    this.showDeleteModal.set(true);
  }

  confirmDelete(): void {
    const user = this.selectedUser();

    if (!user) {
      return;
    }

    this.userService.softDelete(user.id).subscribe({
      next: () => {
        this.users.update((users) =>
          users.map((u) => (u.id === user.id ? { ...u, status: 'INACTIVE' } : u)),
        );
        this.successMessage.set(`El usuario "${user.name}" fue desactivado correctamente.`);
        this.closeDeleteModal();
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err) => {
        console.error('Error desactivando usuario:', err);
        this.errorMessage.set('No se pudo desactivar el usuario. Inténtalo nuevamente.');
        setTimeout(() => this.errorMessage.set(null), 3000);
      },
    });
  }

  restore(user: UserResponse): void {
    this.userService.restore(user.id).subscribe({
      next: (updated) => {
        this.users.update((users) =>
          users.map((u) => (u.id === updated.id ? updated : u)),
        );
        this.successMessage.set(`El usuario "${updated.name}" fue restaurado correctamente.`);
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err) => {
        console.error('Error restaurando usuario:', err);
        this.errorMessage.set('No se pudo restaurar el usuario. Inténtalo nuevamente.');
        setTimeout(() => this.errorMessage.set(null), 3000);
      },
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.selectedUser.set(null);
  }

  isActive(user: UserResponse): boolean {
    return user.status === 'ACTIVE';
  }
}
