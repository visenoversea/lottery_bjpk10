const web3Obj = {
  provider: null,
  signer: null,
  setSinger(obj) {
    web3Obj.signer = obj
  },
  setProvider(obj) {
    web3Obj.provider = obj
  }
}

export default web3Obj

