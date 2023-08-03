const RESOURCES = {
  Point: "point",
  PrestigePoint: "prestigepoint",
} as const;
type ResourceEnumKeys = keyof typeof RESOURCES;
type ResourceEnumValues = (typeof RESOURCES)[ResourceEnumKeys];
type ResourceTurple<T extends ResourceEnumKeys> = [
  key: T,
  value: (typeof RESOURCES)[T],
];

const resourceActionTypes = ["add", "set", "reset"] as const;
type ResourceActions<T extends ResourceEnumValues> = {
  [K in (typeof resourceActionTypes)[number]]: `resource/${K}_${T}`;
};

export const resourceActions = Object.fromEntries(
  (Object.entries(RESOURCES) as Array<ResourceTurple<ResourceEnumKeys>>).map(
    ([key, value]) => {
      return [
        key,
        Object.fromEntries(
          resourceActionTypes.map(type => [type, `resource/${type}_${value}`]),
        ),
      ];
    },
  ),
) as { [K in ResourceEnumKeys]: ResourceActions<(typeof RESOURCES)[K]> };

export const add = (name: ResourceEnumKeys, by: number | string) => ({
  type: resourceActions[name].add,
  payload: by,
});

export const set = (name: ResourceEnumKeys, to: number | string) => ({
  type: resourceActions[name].set,
  payload: to,
});

export const reset = (name: ResourceEnumKeys, to: number | string) => ({
  type: resourceActions[name].reset,
  payload: to,
});

type ResourceAction =
  | ReturnType<typeof add>
  | ReturnType<typeof set>
  | ReturnType<typeof reset>;

interface ResourceDatas {
  amount: string;
  total: string;
}

type ResourceState = { [K in ResourceEnumValues]: ResourceDatas };
const init = () => {
  return Object.fromEntries(
    Object.values(RESOURCES).map(resource => [
      resource,
      {
        amount: "0",
        total: "0",
      },
    ]),
  ) as ResourceState;
};

export default function reducer(
  state: ResourceState = init(),
  action: ResourceAction,
): ResourceState {
  console.log(state);
  const { type: actionType, payload } = action;
  const type = actionType.split("/")[0];
  if (type !== "resource") return state;

  const splited = actionType.slice(type.length + 1).split("_");
  const resourceActionType = splited[0] as (typeof resourceActionTypes)[number];
  const resourceName = splited[1] as ResourceEnumValues;

  if (resourceActionType === "add") {
    return {
      ...state,
      [resourceName]: {
        ...state[resourceName],
        amount: D(state[resourceName].amount).add(payload).toString(),
        total: D(state[resourceName].amount).add(payload).toString(),
      },
    };
  } else if (resourceActionType === "set") {
    return {
      ...state,
      [resourceName]: {
        ...state[resourceName],
        amount: D(payload).toString(),
      },
    };
  } else if (resourceActionType === "reset") {
    return {
      ...state,
      [resourceName]: {
        ...state[resourceName],
        amount: D(payload).toString(),
        total: D(payload).toString(),
      },
    };
  }
  return state;
}
