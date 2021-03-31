<template>
  <div>
    <v-row>
      <div>
        <canvas id="signature-pad-canvas" ref="signaturePadCanvas"></canvas>
      </div>
    </v-row>
    <v-row>
      <v-btn small @click="clear()">{{ $t("reset") }}</v-btn>
      <v-btn small @click="save()">{{ $t("save") }}</v-btn>
    </v-row>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";

export default {
  data: () => ({
    signaturePad: null,
  }),
  mounted() {
    let canvas = this.$refs.signaturePadCanvas;
    this.signaturePad = new SignaturePad(canvas);
    this.onResizeHandler = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.onResizeHandler, false);
    this.resizeCanvas();
  },
  methods: {
    resizeCanvas() {
      let canvas = this.$refs.signaturePadCanvas;

      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio = Math.max(window.devicePixelRatio || 1, 1);

      // This part causes the canvas to be cleared
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);

      // This library does not listen for canvas changes, so after the canvas is automatically
      // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
      // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
      // that the state of this library is consistent with visual state of the canvas, you
      // have to clear it manually.
      this.signaturePad.clear();
    },
    clear() {
      this.signaturePad.clear();
    },
    save() {
      //console.log(this.signaturePad.toDataURL());
    },
  },
};
</script>

<style lang="scss" scoped>
#signature-pad-canvas {
  width: 500px;
  height: 200px;
  border-style: solid;
  border-width: 1px;
  background-color: #f5f5f5;
}
</style>
