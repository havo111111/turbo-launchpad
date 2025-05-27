export interface ThemeConfig {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
}
export interface ContractAddresses {
    main: string;
    hypeToken: string;
    verification: string;
}
export interface Config {
    rpcUrl: string;
    apiEndpoint: string;
    theme: ThemeConfig;
    contractAddresses: ContractAddresses;
}
export declare const config: Config;
