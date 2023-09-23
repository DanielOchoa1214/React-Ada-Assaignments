import { createContext } from "react"

const defaultHomeData = { lights:[] };

export const SmartHomeContext = createContext(defaultHomeData);