export default function adminMenuReducer(state, action){
    switch (action.type){
        case "home":
            return "home";
        case "users-management":
            return "users-management";
        case "courses-management":
            return "courses-management";
        case "notifications":
            return "notifications";
        case "security":
            return "security";
        case "setting":
            return "setting";
        default:
            return "home";
    }
}

