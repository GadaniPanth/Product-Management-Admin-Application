import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseToast(icon: 'success' | 'error' | 'info' | 'warning', title: string, message: string) {
    Swal.fire({
      toast: true,
      position: 'bottom-right',
      icon: icon,
      title: title, // define if needed
      text: message,// define if needed
      showConfirmButton: false,
      showCloseButton: true,
      timer: 2500,
      timerProgressBar: true,
      background: '#2f2f2f',
      color: '#fff',
      customClass: {
        popup: 'small-toast'
      },
    });
  }

  success(message: string, title: string = '') {
    this.baseToast('success', title, message);
  }

  error(message: string, title: string = '') {
    this.baseToast('error', title, message);
  }

  info(message: string, title: string = '') {
    this.baseToast('info', title, message);
  }

  warning(message: string, title: string = '') {
    this.baseToast('warning', title, message);
  }

  sessionExpired() {
    return Swal.fire({
      title: 'Session Expired',
      text: 'Please log in again.',
      icon: 'warning',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: '#2f2f2f',
      color: '#fff',
      customClass: {
        popup: 'small-toast'
      }
    });
  }

  confirm(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      background: '#2f2f2f',
      color: '#fff',
      showCancelButton: true,
      confirmButtonText: '✔️',
      cancelButtonText: '❌',
      customClass: {
        popup: 'small-toast'
      },

    });
  }
}