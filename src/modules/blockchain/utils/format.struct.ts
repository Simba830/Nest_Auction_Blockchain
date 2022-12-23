import { ethers } from 'ethers';

function formatStruct(struct: any): any {
  if (Array.isArray(struct)) {
    return struct.map((value: any) => {
      if (typeof value == 'string') {
        return value?.toLowerCase() ?? '';
      } else if (ethers.BigNumber.isBigNumber(value)) {
        return value.toNumber();
      } else {
        return value;
      }
    });
  }
  return struct;
}

export default formatStruct;
