import { Outlet } from 'react-router';

export default function IndexLayout() {
  return (
    <div className="min-h-dvh max-h-dvh">
      <div className="appbar h-16 shadow-sm border-b border-b-gray-400"></div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
