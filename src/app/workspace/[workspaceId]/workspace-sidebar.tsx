import { AlertTriangle, Loader } from 'lucide-react';

import { useCurrentMember } from '@/features/members/api/use-current-member';
import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { WorkspaceHeader } from './workspace-header';

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: currentMember, isLoading: currentMemberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspaceById({ id: workspaceId });

  if (workspaceLoading || currentMemberLoading) {
    return (
      <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
        <Loader className="size-8 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !currentMember) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center">
        <AlertTriangle className=" text-white text-sm" />
        <p>Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={currentMember.role === 'admin'} />
    </div>
  );
};
