import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IState, TDispatch } from "../models";

type DispatchFunc = () => TDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;
