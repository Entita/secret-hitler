interface Props {
  authError: string;
}

export function RoomNoAccess({ authError }: Props) {
  return <>{authError}</>;
}
