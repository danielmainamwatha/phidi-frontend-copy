import toast from 'toastr';

toast.options = {
  progressBar: false,
  closeButton: true,
  preventDuplicates: true,
  timeOut: 0,
};

export const successMessage = message =>  toast.success(message);
export const errorMessage = message =>  toast.error(message);
