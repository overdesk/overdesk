import { type RouteConfig, index, layout } from '@react-router/dev/routes';

export default [
  layout('../pages/index.layout.tsx', [index('../pages/index.tsx')]),
] satisfies RouteConfig;
