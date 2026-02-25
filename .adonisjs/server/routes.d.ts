import "@adonisjs/core/types/http";

type ParamValue = string | number | bigint | boolean;

export type ScannedRoutes = {
  ALL: {
    "sessions.store": { paramsTuple?: []; params?: {} };
    "registrations.store": { paramsTuple?: []; params?: {} };
    "sessions.destroy": { paramsTuple?: []; params?: {} };
    "registrations.destroy": { paramsTuple?: []; params?: {} };
    health_checks: { paramsTuple?: []; params?: {} };
  };
  POST: {
    "sessions.store": { paramsTuple?: []; params?: {} };
    "registrations.store": { paramsTuple?: []; params?: {} };
  };
  DELETE: {
    "sessions.destroy": { paramsTuple?: []; params?: {} };
    "registrations.destroy": { paramsTuple?: []; params?: {} };
  };
  GET: {
    health_checks: { paramsTuple?: []; params?: {} };
  };
  HEAD: {
    health_checks: { paramsTuple?: []; params?: {} };
  };
};
declare module "@adonisjs/core/types/http" {
  export interface RoutesList extends ScannedRoutes {}
}
