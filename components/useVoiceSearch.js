import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

export const useVoiceSearch = (setQuery) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    const speech = event.value[0];
    setQuery(speech);
    setIsListening(false);
  };

  const onSpeechError = (error) => {
    console.error(error);
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  return { isListening, startListening, stopListening };
};
