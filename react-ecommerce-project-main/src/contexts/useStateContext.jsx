import { useContext } from "react";
import { StateContext } from "./contextProvider"

const useStateContext = () => useContext(StateContext);

export default useStateContext;