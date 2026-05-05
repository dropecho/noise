
export declare class RestKeyValueIterator<T> {
	protected constructor(args: any)
	protected args: T[]
	protected current: number
	hasNext(): boolean
	next(): {
		key: number, 
		value: T
	}
}
