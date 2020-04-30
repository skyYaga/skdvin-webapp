<template>
  <v-card>
    <v-snackbar :color="hintColor" v-model="showHint" :timeout="5000">
      {{ hintText }}
      <v-btn text @click="showHint = false">
        {{ $t("ok") }}
      </v-btn>
    </v-snackbar>
    <v-data-table
      :headers="headers"
      :items="videoflyer"
      :search="search"
      :loading="loading"
      ><template v-slot:item.picAndVid="{ item }">
        <v-simple-checkbox
          v-model="item.picAndVid"
          disabled
        ></v-simple-checkbox> </template
      ><template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ $t("videoflyer.videoflyer") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('search')"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">{{
                $t("videoflyer.add")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <EditVideoflyer :videoflyer="editedItem" />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{
                  $t("cancel")
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="save">{{
                  $t("save")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editVideoflyer(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small @click="assignVideoflyer(item)">
          mdi-calendar-month
        </v-icon>
      </template></v-data-table
    ></v-card
  >
</template>

<script>
import { mapActions } from "vuex";
import EditVideoflyer from "./EditVideoflyer";

export default {
  props: { videoflyer: Array, loading: Boolean },
  components: {
    EditVideoflyer,
  },
  data() {
    return {
      valid: false,
      dialog: false,
      hintText: "",
      hintColor: "",
      showHint: false,
      editedIndex: -1,
      search: "",
      headers: [
        { text: this.$t("firstName"), value: "firstName" },
        { text: this.$t("lastName"), value: "lastName" },
        { text: this.$t("email"), value: "email" },
        { text: this.$t("tel"), value: "tel" },
        { text: this.$t("picAndVid.picAndVid"), value: "picAndVid" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ],
      editedItem: {
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        picAndVid: false,
      },
      defaultItem: {
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        picAndVid: false,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("videoflyer.add")
        : this.$t("videoflyer.edit");
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapActions([
      "addVideoflyerAction",
      "updateVideoflyerAction",
      "deleteVideoflyerAction",
    ]),
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async save() {
      if (this.editedIndex > -1) {
        await this.updateVideoflyer();
      } else {
        await this.saveVideoflyer();
      }
      this.close();
    },
    editVideoflyer(item) {
      this.editedIndex = this.videoflyer.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      if (
        confirm(
          this.$t("videoflyer.delete.question", {
            firstName: item.firstName,
            lastName: item.lastName,
          })
        )
      ) {
        await this.deleteVideoflyer(item);
      }
    },
    async saveVideoflyer() {
      if (this.$refs.form.validate()) {
        this.updating = true;
        let result = await this.addVideoflyerAction({
          videoflyer: this.editedItem,
          token: await this.$auth.getTokenSilently(),
        });
        this.updating = false;
        if (result.success) {
          this.hintText = this.$t("videoflyer.save.successful");
          this.hintColor = "green";
        } else {
          this.hintText = this.$t("videoflyer.save.error");
          this.hintColor = "red";
        }
        this.showHint = true;
      }
    },
    async updateVideoflyer() {
      if (this.$refs.form.validate()) {
        this.updating = true;
        let result = await this.updateVideoflyerAction({
          videoflyer: this.editedItem,
          token: await this.$auth.getTokenSilently(),
        });
        this.updating = false;
        if (result.success) {
          this.hintText = this.$t("videoflyer.update.successful");
          this.hintColor = "green";
        } else {
          this.hintText = this.$t("videoflyer.update.error");
          this.hintColor = "red";
        }
        this.showHint = true;
      }
    },
    async deleteVideoflyer(item) {
      this.updating = true;
      let result = await this.deleteVideoflyerAction({
        id: item.id,
        token: await this.$auth.getTokenSilently(),
      });
      this.updating = false;
      if (result.success) {
        this.hintText = this.$t("videoflyer.delete.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("videoflyer.delete.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
    assignVideoflyer(item) {
      this.$emit("handleAssignClick", item);
    },
  },
};
</script>
