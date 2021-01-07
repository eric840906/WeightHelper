<template>
  <div class="crop-block">
    <div class="form-title"><camera-icon/><h3>Avatar</h3></div>
    <img :src="thumbnail" alt="" name="avatar" class="preview" v-if="thumbnail">
    <p class="preview-text" v-else>Preview area</p>
    <vue-cropper
      v-if="imgSrc"
      ref="cropper"
      :aspect-ratio="1/1"
      :src="imgSrc"
      preview=".preview"
    />
    <p v-if="errorText" style="color: #ff4436;"><alert-icon/>{{errorText}}</p>
    <label for="userImage"><image-icon/>Choose an image
      <input type="file" id="userImage" ref="input" name="image-to-cut" style="display: none;" accept=".jpg, .png, .jpeg" @change="setImage"/>
    </label>
    <div class="cropper-btn-group">
      <button title="crop" class="cropper-btn" @click.prevent="cropImage">
        <crop/>
      </button>
      <button title="reset" class="cropper-btn" @click.prevent="reset">
        <reset/>
      </button>
      <button title="flipX" class="cropper-btn" ref="flipX" @click.prevent="flipX">
        <flipX/>
      </button>
      <button title="flipY" class="cropper-btn" ref="flipY" @click.prevent="flipY">
        <flipY/>
      </button>
      <button title="rotate(90)" class="cropper-btn" @click.prevent="rotate(90)">
        <right-rotate/>
      </button>
      <button title="rotate(-90)" class="cropper-btn" @click.prevent="rotate(-90)">
        <left-rotate/>
      </button>
    </div>
    <button @click.prevent="uploadImage" :disabled="!thumbnail" class="form-btn">Confirm and upload</button>
  </div>
</template>
<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import cameraIcon from 'vue-material-design-icons/CameraEnhanceOutline.vue'
import alertIcon from 'vue-material-design-icons/AlertOutline.vue'
import crop from 'vue-material-design-icons/Crop.vue'
import reset from 'vue-material-design-icons/Autorenew.vue'
import flipX from 'vue-material-design-icons/FlipHorizontal.vue'
import flipY from 'vue-material-design-icons/FlipVertical.vue'
import rightRotate from 'vue-material-design-icons/RotateRight.vue'
import leftRotate from 'vue-material-design-icons/RotateLeft.vue'
import imageIcon from 'vue-material-design-icons/ImageOutline.vue'
export default {
  components: {
    VueCropper,
    cameraIcon,
    alertIcon,
    crop,
    reset,
    flipY,
    flipX,
    rightRotate,
    leftRotate,
    imageIcon
  },
  data: () => ({
    thumbnail: '',
    imgSrc: undefined,
    newFile: undefined,
    errorText: ''
  }),
  methods: {
    blobToFile (theBlob, fileName) {
      // A Blob() is almost a File() - it's just missing the two properties below which we will add
      theBlob.lastModifiedDate = new Date()
      theBlob.name = fileName
      return theBlob
    },
    uploadImage (e) {
      const fd = new FormData()
      fd.append('avatar', this.newFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/auth/avatar`
      const config = {
        headers: {
          'auth-token': this.$store.state.token,
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios.post(url, fd, config)
        .then(response => {
          this.$store.commit('LOADING', true)
          if (response.status === 200) {
            this.$store.dispatch('getAvatar')
          }
        })
        .catch(error => {
          if (error.response.data === 'Invalid token, please relog') {
            this.$store.commit('LOGOUT')
            this.errorText = error.response.data
            this.$store.commit('LOADING', false)
            setTimeout(() => this.$modal.hideAll(), 2000)
          }
        })
    },
    newPic (e) {
      this.$refs.input.click()
      this.imgSrc = window.URL.createObjectURL(this.$refs.files.files[0])
    },
    setImage (e) {
      const file = e.target.files[0]
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cropImage () {
      // get image data for post processing, e.g. upload or setting image src
      this.thumbnail = this.$refs.cropper.getCroppedCanvas().toDataURL()
      // console.log(this.thumbnail)

      // base64 to blob
      const imgB64 = this.$refs.cropper.getCroppedCanvas().toDataURL('image/png')
      const png = imgB64.split(',')[1]
      const convertFile = new Blob([window.atob(png)], { type: 'image/png', encoding: 'utf-8' })
      this.newFile = convertFile
      // console.log(this.newFile)
      // console.log(this.blobToFile(this.newFile))
      // blob to base64
      // const fr = new FileReader()
      // fr.onload = (oFREvent) => {
      //   let v = oFREvent.target.result.split(',')[1] // encoding is messed up here, so we fix it
      //   v = atob(v)
      //   const goodB64 = btoa(decodeURIComponent(escape(v)))
      //   // console.log(goodB64)
      // }
      // fr.readAsDataURL(convertFile)
    },
    reset () {
      this.$refs.cropper.reset()
    },
    flipX () {
      const dom = this.$refs.flipX
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleX(scale)
      dom.setAttribute('data-scale', scale)
    },
    flipY () {
      const dom = this.$refs.flipY
      let scale = dom.getAttribute('data-scale')
      scale = scale ? -scale : -1
      this.$refs.cropper.scaleY(scale)
      dom.setAttribute('data-scale', scale)
    },
    rotate (deg) {
      this.$refs.cropper.rotate(deg)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
  .form-btn{
    background: darken($background, 5%);
    border: none;
    transition: all 0.3s ease-in;
    &:hover{
      background: darken($background, 15%);
      color: darken($background, 65%);
    }
  }
  .crop-block{
    display: flex;
    padding: 30px;
    flex-direction: column;
    border-radius: 5px;
  }
  .cropper-btn-group{
    display: flex;
    justify-content: space-evenly;
    margin: 5px 0;
    .cropper-btn{
      border: none;
      color: black;
      background: transparent;
      .material-design-icon{
        svg{
          height: 30px;
          width: 30px;
        }
      }
      &:hover{
        background: darken($background, 15%);
        color: darken($background, 65%);
      }
    }
  }
  .preview{
    border-radius: 50%;
    width: 109px !important;
    height: 109px !important;
    margin: 15px auto;
    border: 1px dashed black;
  }
  .preview-text{
    text-align: center;
    line-height: 8;
    border: 1px dashed black;
  }
  #userImage{
    overflow: hidden;
  }
  .form-title{
    .material-design-icon{
      svg{
        width: 30px;
        height: 30px;
      }
    }
    text-align: center;
  }
</style>
