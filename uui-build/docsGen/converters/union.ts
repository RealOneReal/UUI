import { Node } from 'ts-morph';
import { Converter } from './converter';
import { ConverterUtils } from './converterUtils';
import { TTypeValue } from '../types';

export class Union extends Converter {
    override isSupported(typeNode: Node) {
        return ConverterUtils.getTypeFromNode(typeNode).isUnion();
    }

    protected override isPropsSupported(typeNode: Node) {
        const type = typeNode.getType();
        const isExternalType = ConverterUtils.isExternalNode(typeNode);
        return ConverterUtils.isPropsSupportedByType({ type, isExternalType });
    }

    protected override getTypeValue(typeNode: Node): TTypeValue {
        const types = typeNode.getType().getUnionTypes();
        return {
            raw: types.map((t) => {
                return ConverterUtils.getCompilerTypeText(t);
            }).join(' | '),
            print: ConverterUtils.printNode(typeNode),
        };
    }
}
