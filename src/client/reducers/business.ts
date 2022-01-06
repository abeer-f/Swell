import { format } from 'date-fns';
import * as types from '../actions/actionTypes';

const initialState = {
  currentTab: 'First Tab',
  reqResArray: [],
  scheduledReqResArray: [],
  history: [],
  collections: [],
  warningMessage: {},
  newRequestsOpenAPI: {
    openapiMetadata: {
      info: {},
      tags: [],
      serverUrls: [],
    },
    openapiReqArray: [],
  },
  newRequestFields: {
    protocol: '',
    restUrl: 'http://',
    wsUrl: 'ws://',
    gqlUrl: 'https://',
    grpcUrl: '',
    webrtcUrl: '',
    url: 'http://',
    method: 'GET',
    graphQL: false,
    gRPC: false,
    ws: false,
    openapi: false,
    webrtc: false,
    webhook: false,
    network: 'rest',
    testContent: '',
    testResults: [],
    openapiReqObj: {},
  },
  newRequestHeaders: {
    headersArr: [],
    count: 0,
  },
  newRequestStreams: {
    streamsArr: [],
    count: 0,
    streamContent: [],
    selectedPackage: null,
    selectedRequest: null,
    selectedService: null,
    selectedServiceObj: null,
    selectedStreamingType: null,
    initialQuery: null,
    queryArr: null,
    protoPath: null,
    services: null,
    protoContent: '',
  },
  newRequestCookies: {
    cookiesArr: [],
    count: 0,
  },
  newRequestBody: {
    bodyContent: '',
    bodyVariables: '',
    bodyType: 'raw',
    rawType: 'text/plain',
    JSONFormatted: true,
    bodyIsNew: false,
  },
  newRequestSSE: {
    isSSE: false,
  },
  newRequestOpenAPIObject: {
    request: {
      id: 0,
      enabled: true,
      reqTags: [],
      reqServers: [],
      summary: '',
      description: '',
      operationId: '',
      method: '',
      endpoint: '',
      headers: {},
      parameters: [],
      body: new Map(),
      urls: [],
    },
  },
  introspectionData: { schemaSDL: null, clientSchema: null },
  dataPoints: {},
  currentResponse: {
    request: {
      network: '',
    },
  },
};

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
const businessReducer = (state = initialState, action: $TSFixMe) => {
  switch (action.type) {
    case types.GET_HISTORY: {
      return {
        ...state,
        history: action.payload,
      };
    }

    case types.DELETE_HISTORY: {
      const deleteId = action.payload.id;
      const deleteDate = format(action.payload.createdAt, 'MM/DD/YYYY');
      const newHistory = JSON.parse(JSON.stringify(state.history));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
      newHistory.forEach((obj: $TSFixMe, i: $TSFixMe) => {
        if (obj.date === deleteDate)
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
          obj.history = obj.history.filter((hist: $TSFixMe) => hist.id !== deleteId);
        if (obj.history.length === 0) {
          newHistory.splice(i, 1);
        }
      });
      return {
        ...state,
        history: newHistory,
      };
    }

    case types.CLEAR_HISTORY: {
      return {
        ...state,
        history: [],
      };
    }

    case types.GET_COLLECTIONS: {
      return {
        ...state,
        collections: action.payload,
      };
    }

    case types.DELETE_COLLECTION: {
      const deleteId = action.payload.id;
      const newCollections = JSON.parse(JSON.stringify(state.collections));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
      newCollections.forEach((obj: $TSFixMe, i: $TSFixMe) => {
        if (obj.id === deleteId) {
          newCollections.splice(i, 1);
        }
      });
      return {
        ...state,
        collections: newCollections,
      };
    }

    case types.RESET_COMPOSER_FIELDS: {
      return {
        ...state,
        newRequestHeaders: {
          headersArr: [],
          count: 0,
        },
        newRequestCookies: {
          cookiesArr: [],
          count: 0,
        },
        newRequestBody: {
          ...state.newRequestBody,
          bodyContent: '',
          bodyVariables: '',
          bodyType: 'raw',
          rawType: 'text/plain',
          JSONFormatted: true,
        },
        newRequestFields: {
          ...state.newRequestFields,
          protocol: '',
        },
        newRequestSSE: {
          isSSE: false,
        },
        warningMessage: {},
      };
    }

    case types.COLLECTION_TO_REQRES: {
      const reqResArray = JSON.parse(JSON.stringify(action.payload));
      return {
        ...state,
        reqResArray,
      };
    }

    case types.COLLECTION_ADD: {
      // add to collection to array in state
      return {
        ...state,
        collections: [action.payload, ...state.collections],
      };
    }

    case types.COLLECTION_UPDATE: {
      // update collection from state
      const collectionName = action.payload.name;
      const newCollections = JSON.parse(JSON.stringify(state.collections));
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
      newCollections.forEach((obj: $TSFixMe, i: $TSFixMe) => {
        if (obj.name === collectionName) {
          newCollections[i] = action.payload;
        }
      });

      return {
        ...state,
        collections: newCollections,
      };
    }

    case types.REQRES_CLEAR: {
      return {
        ...state,
        reqResArray: [],
        currentResponse: {
          request: {
            network: '',
          },
        },
      };
    }

    case types.REQRES_ADD: {
      const reqResArray = JSON.parse(JSON.stringify(state.reqResArray));
      reqResArray.push(action.payload);
      const addDate = format(action.payload.createdAt, 'MM/DD/YYYY');
      const newHistory = JSON.parse(JSON.stringify(state.history));
      let updated = false;
      // if there is history for added date, add query to beginning of history
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
      newHistory.forEach((obj: $TSFixMe) => {
        if (obj.date === addDate) {
          obj.history.unshift(action.payload);
          updated = true;
        }
      });
      // if there is not history at added date, create new history with new query
      if (!updated) {
        newHistory.unshift({
          date: addDate,
          history: [action.payload],
        });
      }
      return {
        ...state,
        reqResArray,
        history: newHistory,
      };
    }

    case types.REQRES_DELETE: {
      const deleteId = action.payload.id;
      const newReqResArray = state.reqResArray.filter(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
        (reqRes) => reqRes.id !== deleteId
      );
      return {
        ...state,
        reqResArray: newReqResArray,
      };
    }

    case types.SET_CHECKS_AND_MINIS: {
      return {
        ...state,
        reqResArray: JSON.parse(JSON.stringify(action.payload)),
      };
    }

    case types.REQRES_UPDATE: {
      const reqResDeepCopy = JSON.parse(JSON.stringify(state.reqResArray));
      let indexToBeUpdated;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
      reqResDeepCopy.forEach((reqRes: $TSFixMe, index: $TSFixMe) => {
        if (reqRes.id === action.payload.id) indexToBeUpdated = index;
      });
      if (indexToBeUpdated !== undefined) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'never'.
        action.payload.checked = state.reqResArray[indexToBeUpdated].checked;
        action.payload.minimized =
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'minimized' does not exist on type 'never... Remove this comment to see the full error message
          state.reqResArray[indexToBeUpdated].minimized;
        reqResDeepCopy.splice(
          indexToBeUpdated,
          1,
          JSON.parse(JSON.stringify(action.payload))
        ); // FOR SOME REASON THIS IS NECESSARY, MESSES UP CHECKS OTHERWISE
      }

      return {
        ...state,
        reqResArray: reqResDeepCopy,
      };
    }

    case types.SCHEDULED_REQRES_UPDATE: {
      const scheduledReqResArray = JSON.parse(
        JSON.stringify(state.scheduledReqResArray)
      );
      scheduledReqResArray.push(action.payload);
      return {
        ...state,
        scheduledReqResArray,
      };
    }

    case types.SCHEDULED_REQRES_DELETE: {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
      const scheduledReqResArray: $TSFixMe = [];
      return {
        ...state,
        scheduledReqResArray,
      };
    }

    case types.UPDATE_GRAPH: {
      const { id } = action.payload;
      // action.payload is the latest reqRes object

      // dataPoints to be used by graph
      const dataPointsCopy = JSON.parse(JSON.stringify(state.dataPoints));
      dataPointsCopy.current = id;
      // if more than 8 points, data will shift down an index
      if (!dataPointsCopy[id]) {
        dataPointsCopy[id] = [];
      } else if (dataPointsCopy[id].length > 49) {
        dataPointsCopy[id] = dataPointsCopy[id].slice(1);
      }

      // check if new object is a closed request with timeSent and timeReceived
      if (
        !dataPointsCopy[id].some(
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
          (elem: $TSFixMe) => elem.timeSent === action.payload.timeSent
        )
      ) {
        // if a color hasn't been added to this specific request id, add a new one
        const color = !dataPointsCopy[id][0]?.color
          ? `${Math.random() * 256}, ${Math.random() * 256}, ${
              Math.random() * 256
            }`
          : dataPointsCopy[id][0].color;

        // add dataPoint to array connected to its id -and return to state
        dataPointsCopy[id].push({
          reqRes: action.payload,
          url: action.payload.url,
          timeSent: action.payload.timeSent,
          timeReceived: action.payload.timeReceived,
          createdAt: action.payload.createdAt,
          color,
        });
        return {
          ...state,
          dataPoints: dataPointsCopy,
        };
      }
      return {
        ...state,
        dataPoints: dataPointsCopy,
      };
    }

    case types.CLEAR_GRAPH: {
      const dataPointsCopy = JSON.parse(JSON.stringify(state.dataPoints));
      dataPointsCopy[action.payload] = [];
      return {
        ...state,
        dataPoints: dataPointsCopy,
      };
    }

    case types.CLEAR_ALL_GRAPH: {
      return {
        ...state,
        dataPoints: {},
      };
    }

    case types.SET_COMPOSER_WARNING_MESSAGE: {
      return {
        ...state,
        warningMessage: action.payload,
      };
    }

    case types.SET_NEW_REQUEST_FIELDS: {
      return {
        ...state,
        newRequestFields: action.payload,
      };
    }

    case types.SET_NEW_REQUEST_HEADERS: {
      return {
        ...state,
        newRequestHeaders: action.payload,
      };
    }

    case types.SET_NEW_REQUEST_STREAMS: {
      return {
        ...state,
        newRequestStreams: action.payload,
      };
    }

    case types.SET_NEW_REQUEST_BODY: {
      return {
        ...state,
        newRequestBody: action.payload,
      };
    }

    case types.SET_NEW_TEST_CONTENT: {
      return {
        ...state,
        newRequestFields: {
          ...state.newRequestFields,
          testContent: action.payload,
        },
      };
    }

    case types.SET_NEW_REQUEST_COOKIES: {
      return {
        ...state,
        newRequestCookies: action.payload,
      };
    }

    case types.SET_NEW_REQUEST_SSE: {
      return {
        ...state,
        newRequestSSE: { isSSE: action.payload },
      };
    }

    case types.SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }

    case types.SET_INTROSPECTION_DATA: {
      return {
        ...state,
        introspectionData: action.payload,
      };
    }

    case types.SAVE_CURRENT_RESPONSE_DATA: {
      return {
        ...state,
        currentResponse: action.payload,
      };
    }

    // OPENAPI

    case types.SET_NEW_REQUESTS_OPENAPI: {
      return {
        ...state,
        newRequestsOpenAPI: { ...action.payload },
      };
    }

    case types.SET_OPENAPI_SERVERS_GLOBAL: {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiMetadata' does not exist on type ... Remove this comment to see the full error message
      const openapiMetadata = { ...state.openapiMetadata };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiMetadata' does not exist on type ... Remove this comment to see the full error message
      openapiMetadata.serverUrls = [...state.openapiMetadata.serverUrls].filter(
        (_, i) => action.payload.includes(i)
      );
      return {
        ...state,
        newRequestsOpenAPI: openapiMetadata,
      };
    }

    case types.SET_NEW_OPENAPI_SERVERS: {
      const { id, serverIds } = action.payload;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
      const request = [...state.openapiReqArray]
        .filter(({ request }) => request.id === id)
        .pop();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiMetadata' does not exist on type ... Remove this comment to see the full error message
      request.reqServers = [...state.openapiMetadata.serverUrls].filter(
        (_, i) => serverIds.includes(i)
      );
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
      const openapiReqArray = [...state.openapiReqArray].push({ request });
      return {
        ...state,
        newRequestsOpenAPI: openapiReqArray,
      };
    }

    case types.SET_NEW_OPENAPI_PARAMETER: {
      const { id, location, name, value } = action.payload;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
      const request = [...state.openapiReqArray]
        .filter(({ request }) => request.id === id)
        .pop();
      const urls = [...request.reqServers].map(
        (url) => (url += request.endpoint)
      );
      switch (location) {
        case 'path': {
          urls.map((url) => url.replace(`{${name}}`, value));
          request.urls = urls;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
          const openapiReqArray = [...state.openapiReqArray].push({ request });
          return {
            ...state,
            newRequestsOpenAPI: openapiReqArray,
          };
        }
        case 'query': {
          urls.map((url) => {
            if (url.slice(-1) !== '?') url += '?';
            url += `${name}=${value}&`;
          });
          request.urls = urls;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
          const openapiReqArray = [...state.openapiReqArray].push({ request });
          return {
            ...state,
            newRequestsOpenAPI: openapiReqArray,
          };
        }
        case 'header': {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'key'.
          if (['Content-Type', 'Authorization', 'Accepts'].includes(key)) break;
          request.headers.push({ name: value });
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
          const openapiReqArray = [...state.openapiReqArray].push({ request });
          return {
            ...state,
            newRequestsOpenAPI: openapiReqArray,
          };
        }
        case 'cookie': {
          request.cookies = value;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
          const openapiReqArray = [...state.openapiReqArray].push({ request });
          return {
            ...state,
            newRequestsOpenAPI: openapiReqArray,
          };
        }
        default: {
          return state;
        }
      }
      break;
    }
    case types.SET_NEW_OPENAPI_REQUEST_BODY: {
      const { id, mediaType, requestBody } = action.payload;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
      const request = [...state.openapiReqArray]
        .filter(({ request }) => request.id === id)
        .pop();
      const { method } = request;
      if (
        !['get', 'delete', 'head'].includes(method) &&
        requestBody !== undefined
      ) {
        request.body = requestBody;
        request.rawType = mediaType;
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openapiReqArray' does not exist on type ... Remove this comment to see the full error message
      const openapiReqArray = [...state.openapiReqArray].push({ request });
      return {
        ...state,
        newRequestsOpenAPI: openapiReqArray,
      };
    }

    default:
      return state;
  }
};

export default businessReducer;
