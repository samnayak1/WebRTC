class PeerService{

  constructor(){
    if(!this.peer){
        this.peer=new RTCPeerConnection({

            iceServers:[{

                urls:[

                    'stun:stun.l.google.com:19302',
                    'stun:global.stun.twilio.com:3478',
                ]
            }]
        })
    }
  }

  async getOffer(){
    if(this.peer){
        const offer=await this.peer.createOffer()
        await this.peer.setLocalDescription(new RTCSessionDescription(offer)) //create an offer and set it as localDescription
        return offer
    }
  }
  async getAnswer(offer){
    if(this.peer){
       await this.peer.setRemoteDescription(offer)           //set the offer as remote description, create an answer, set answer as local description 
       const ans=await this.peer.createAnswer()
       console.log('answer here is '+ans)
       await this.peer.setLocalDescription(new RTCSessionDescription(ans)) 
       return ans

    }


  }
  async setlocalDescription(ans){
    if(this.peer){
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans))
    }
  }



}

export default new PeerService()