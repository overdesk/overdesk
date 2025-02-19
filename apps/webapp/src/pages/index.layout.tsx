import { Outlet } from 'react-router';

export default function IndexLayout() {
  return (
    <div>
      <div className="appbar"></div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
