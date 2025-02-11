import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../api/use-create-workspace';

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [openModal, setOpenModal] = useCreateWorkspaceModal();

  const { mutate, isPending } = useCreateWorkspace();

  const handleCloseModal = () => {
    setOpenModal(false);
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success('Workspace created!');
          router.push(`workspace/${id}`);
          handleCloseModal();
        },
      },
    );
  };

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            autoFocus
            required
            disabled={isPending}
            placeholder="Workspace name"
            value={name}
            minLength={3}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
