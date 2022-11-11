import { configureStore } from '@reduxjs/toolkit';
import feedData from "./Utils";

export const Store = configureStore({
    reducer: {
        feedData: feedData,
    },
});