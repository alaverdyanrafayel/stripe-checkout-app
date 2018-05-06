// @flow

import axios, {AxiosPromise} from "axios";
import params from 'configs/params';

export function attemptSignUp(data: any) {
    if(!params.apiUrl) return;
        return axios.request({
            url: `${params.apiUrl}/auth/register`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: data
        });
    }
