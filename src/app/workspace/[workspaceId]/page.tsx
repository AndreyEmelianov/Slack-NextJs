'use client';
import { useGetWorkspaceById } from '@/features/workspaces/api/use-get-workspace-by-id';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspaceById({ id: workspaceId });

  return <div>data: {JSON.stringify(data)}</div>;
};

export default WorkspaceIdPage;
