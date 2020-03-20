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
      :items="tandemmaster"
      :search="search"
      :loading="loading"
      ><template v-slot:item.handcam="{ item }">
        <v-simple-checkbox
          v-model="item.handcam"
          disabled
        ></v-simple-checkbox> </template
      ><template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{
            $t("tandemmaster.tandemmaster")
          }}</v-toolbar-title>
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
                $t("tandemmaster.add")
              }}</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <EditTandemmaster :tandemmaster="editedItem" />
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
        <v-icon small class="mr-2" @click="editTandemmaster(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small @click="assignTandemmaster(item)">
          mdi-calendar-month
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">{{ $t("reset") }}</v-btn>
      </template></v-data-table
    ></v-card
  >
</template>

<script>
import { mapActions } from "vuex";
import EditTandemmaster from "./EditTandemmaster";

export default {
  props: { tandemmaster: Array, loading: Boolean },
  components: {
    EditTandemmaster
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
        { text: this.$t("handcam.handcam"), value: "handcam" },
        { text: this.$t("actions"), value: "actions", sortable: false }
      ],
      editedItem: {
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        handcam: false
      },
      defaultItem: {
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        handcam: false
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("tandemmaster.add")
        : this.$t("tandemmaster.edit");
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    ...mapActions([
      "addTandemmasterAction",
      "updateTandemmasterAction",
      "deleteTandemmasterAction"
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
        await this.updateTandemmaster();
      } else {
        await this.saveTandemmaster();
      }
      this.close();
    },
    editTandemmaster(item) {
      this.editedIndex = this.tandemmaster.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      if (
        confirm(
          this.$t("tandemmaster.delete.question", {
            firstName: item.firstName,
            lastName: item.lastName
          })
        )
      ) {
        await this.deleteTandemmaster(item);
      }
    },
    async saveTandemmaster() {
      if (this.$refs.form.validate()) {
        this.updating = true;
        let result = await this.addTandemmasterAction({
          tandemmaster: this.editedItem,
          token: await this.$auth.getTokenSilently()
        });
        this.updating = false;
        if (result.success) {
          this.hintText = this.$t("tandemmaster.save.successful");
          this.hintColor = "green";
        } else {
          this.hintText = this.$t("tandemmaster.save.error");
          this.hintColor = "red";
        }
        this.showHint = true;
      }
    },
    async updateTandemmaster() {
      if (this.$refs.form.validate()) {
        this.updating = true;
        let result = await this.updateTandemmasterAction({
          tandemmaster: this.editedItem,
          token: await this.$auth.getTokenSilently()
        });
        this.updating = false;
        if (result.success) {
          this.hintText = this.$t("tandemmaster.update.successful");
          this.hintColor = "green";
        } else {
          this.hintText = this.$t("tandemmaster.update.error");
          this.hintColor = "red";
        }
        this.showHint = true;
      }
    },
    async deleteTandemmaster(item) {
      this.updating = true;
      let result = await this.deleteTandemmasterAction({
        id: item.id,
        token: await this.$auth.getTokenSilently()
      });
      this.updating = false;
      if (result.success) {
        this.hintText = this.$t("tandemmaster.delete.successful");
        this.hintColor = "green";
      } else {
        this.hintText = this.$t("tandemmaster.delete.error");
        this.hintColor = "red";
      }
      this.showHint = true;
    },
    assignTandemmaster(item) {
      this.$emit("handleAssignClick", item);
    }
  }
};
</script>
