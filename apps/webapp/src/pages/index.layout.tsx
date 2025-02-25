import { Outlet } from 'react-router';

export default function IndexLayout() {
  return (
    <div className="min-h-dvh max-h-dvh">
      <div className="appbar"></div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
