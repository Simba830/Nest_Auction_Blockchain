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
  } else {
    if (typeof struct == 'string') {
      return struct?.toLowerCase() ?? '';
    } else if (ethers.BigNumber.isBigNumber(struct)) {
      return struct.toNumber();
    } else {
      return struct;
    }
  }
  return struct;
}

export default formatStruct;
