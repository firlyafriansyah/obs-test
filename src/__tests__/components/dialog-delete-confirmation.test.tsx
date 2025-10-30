import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DialogDeleteConfirmation from '../../components/dialog-delete-confirmation';

describe('DialogDeleteConfirmation', () => {
  const mockSetOpen = vi.fn();
  const mockOnYes = vi.fn();

  const defaultProps = {
    open: true,
    setOpen: mockSetOpen,
    onYes: mockOnYes,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Visibility', () => {
    it('should be visible when open is true', () => {
      const { container } = render(<DialogDeleteConfirmation {...defaultProps} />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('flex');
      expect(dialog).not.toHaveClass('hidden');
    });

    it('should be hidden when open is false', () => {
      const { container } = render(<DialogDeleteConfirmation {...defaultProps} open={false} />);
      const dialog = container.firstChild as HTMLElement;

      expect(dialog).toHaveClass('hidden');
      expect(dialog).not.toHaveClass('flex');
    });
  });

  describe('Content', () => {
    it('should display the confirmation title', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      expect(screen.getByText('Are you sure want to delete?')).toBeInTheDocument();
    });

    it('should display the warning message', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      expect(
        screen.getByText(
          'This delete action cant be undone, make sure you doing the right action.',
        ),
      ).toBeInTheDocument();
    });

    it('should display Yes button', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      expect(screen.getByText('Yes')).toBeInTheDocument();
    });

    it('should display Cancel button', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should display close icon button', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      expect(screen.getByTitle('X')).toBeInTheDocument();
    });
  });

  describe('Yes Button Functionality', () => {
    it('should call onYes when Yes button is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      const yesButton = screen.getByText('Yes');

      fireEvent.click(yesButton);

      expect(mockOnYes).toHaveBeenCalledTimes(1);
    });

    it('should call setOpen with false when Yes button is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      const yesButton = screen.getByText('Yes');

      fireEvent.click(yesButton);

      expect(mockSetOpen).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should call both onYes and setOpen when Yes button is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      const yesButton = screen.getByText('Yes');

      fireEvent.click(yesButton);

      expect(mockOnYes).toHaveBeenCalled();
      expect(mockSetOpen).toHaveBeenCalled();
    });
  });

  describe('Cancel Button Functionality', () => {
    it('should call setOpen with false when Cancel button is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      const cancelButton = screen.getByText('Cancel');

      fireEvent.click(cancelButton);

      expect(mockSetOpen).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should not call onYes when Cancel button is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      const cancelButton = screen.getByText('Cancel');

      fireEvent.click(cancelButton);

      expect(mockOnYes).not.toHaveBeenCalled();
    });
  });

  describe('Close Icon Button Functionality', () => {
    it('should call setOpen with false when close icon is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      fireEvent.click(screen.getByTitle('X'));

      expect(mockSetOpen).toHaveBeenCalledTimes(1);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });

    it('should not call onYes when close icon is clicked', () => {
      render(<DialogDeleteConfirmation {...defaultProps} />);
      fireEvent.click(screen.getByTitle('X'));

      expect(mockOnYes).not.toHaveBeenCalled();
    });
  });
});
