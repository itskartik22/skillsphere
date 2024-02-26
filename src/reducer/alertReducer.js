export default function alertReducer(state, action) {
  switch (action.type) {
    case "success":
      return {
        status: true,
        type: "success",
        message: action.message,
      };
    case "alert":
      return {
        status: true,
        type: "alert",
        message: action.message,
      };
    case "warning":
      return {
        status: true,
        type: "warning",
        message: action.message,
      };
    case "error":
      return {
        status: true,
        type: "error",
        message: action.message,
      };
    case "remove":
      return {
        status: false,
        type: "",
        message: "",
      };
    default:
      return {
        status: false,
        type: "",
        message: "",
      };
  }
}
