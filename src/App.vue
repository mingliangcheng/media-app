<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "nutui-uniapp/styles/index";
:root,
page {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  --nut-cell-desc-color: #333333;
  --nut-disable-color: #b2b2b2;
  --nut-cell-after-border-bottom: 1px solid #e5e5e5;
}
</style>
