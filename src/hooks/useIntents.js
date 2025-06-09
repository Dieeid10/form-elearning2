import { useRef } from 'react';

export const useIntents = () => {
    const intents = useRef(0)
    const intentsLimit = 2

    const resetIntents = () => {
        intents.current = 0
    }

    const incrementIntents = () => {
        intents.current += 1
    }

    return { intents, incrementIntents, intentsLimit, resetIntents }
}