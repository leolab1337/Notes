import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Button, Text, View } from 'react-native'
import Loading from './loading';


const settingOpts = (opts = { lang: 'EN' }) => {
    const _settings = {
        lang: opts.lang,
    };
    return _settings;
};


const Triggerloading1 = ({ dispatch, lang }: { dispatch: any, lang: string }) => {

    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('settings')
            .then((settingsJSON: JSON | any) => {
                const _settings = settingOpts(JSON.parse(settingsJSON));
                console.log({ _settings, settingsJSON });
                i18n.changeLanguage(_settings.lang);
                dispatch({ type: _settings.lang });
            })
            .catch((settingsJSON: JSON | any) => {
                const _settings = settingOpts();
                console.log({ _settings, settingsJSON });
                i18n.changeLanguage(_settings.lang);
                dispatch({ type: _settings.lang });
            });
    }, []);





    return (
        <View>
            <Text>{t('home')}</Text>
            <Button
                title={t('startLoading')}
                onPress={() => setIsLoading(!isLoading)}
                disabled={isLoading}
            />
            <Button
                title={t('stopLoading')}
                onPress={() => setIsLoading(!isLoading)}
                disabled={!isLoading}
            />
            <ActivityIndicator size="large" color="#f1f1f1" />
            {isLoading ? <Loading /> : (<Text>{t('loaded')}</Text>)}
        </View>


    )
}

export default Triggerloading1
