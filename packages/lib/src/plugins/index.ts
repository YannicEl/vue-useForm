import { Form } from '../useForm';

export * from './storagePlugin';

export type Plugin<T extends Form = any> = (...params: any) => (form: T) => void;
