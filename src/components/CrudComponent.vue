<template>
    <div class="crud" style="background: linear-gradient(-180deg, #BCC5CE 0%, #929EAD 98%), radial-gradient(at top left, rgba(255,255,255,0.30) 0%, rgba(0,0,0,0.30) 100%); background-blend-mode: screen; height: 150vh;">
        <v-container>
            <v-card>
                <!-- All product view from db to Table -->
                <v-data-table
                    :headers="headers"
                    :items="products"
                    sort-by="id"
                    sort-desc
                    class="elevation-5"
                    :search="search"
                    :loading="tableLoader"
                >
                    <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title>Products CRUD</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            class="hidden-sm-and-down mr-3"
                        ></v-text-field>
                        <v-dialog
                        v-model="dialog"
                        max-width="500px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="teal"
                            dark
                            class="mb-2 white--text"
                            v-bind="attrs"
                            v-on="on"
                            >
                            <v-icon left>mdi-plus</v-icon>Add
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="6"
                                >
                                    <v-text-field
                                    v-model="editedItem.title"
                                    label="Title"
                                    type="text"
                                    @focus="$event.target.select()"
                                    hint="Product Title"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="6"
                                >
                                    <v-textarea
                                        clearable
                                        clear-icon="mdi-close-circle"
                                        label="Description"
                                        rows="1"
                                        v-model="editedItem.description"
                                        hint="Write Product Description Here..."
                                        counter
                                        @focus="$event.target.select()"
                                    ></v-textarea>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="editedItem.price"
                                    label="Price"
                                    prepend-inner-icon="mdi-currency-usd"
                                    type="number"
                                    @focus="$event.target.select()"
                                    hint="Product Price"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="8"
                                >
                                    <v-file-input
                                        label="Upload Image"
                                        placeholder="Click Here"
                                        class=""
                                        v-model="editedItem.image"
                                        outlined 
                                        dense
                                        show-size
                                        chips
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp"
                                        prepend-icon="mdi-camera"
                                        type="file"
                                        @change="onImageSelected"
                                        id="my-image"
                                    ></v-file-input>
                                </v-col>
                                <v-col
                                  cols="12"
                                  class="d-flex justify-center"
                                >
                                  <img :src="selectedImage" style="height: auto; width: 100px;"/>
                                  <v-btn v-show="selectedImage != '' && selectedImage != null" text color="primary" @click="removeImage" class="mx-5" x-small>Remove</v-btn>
                                </v-col>
                              </v-row>
                            </v-container>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                                :loading="saveBtnLoading"
                            >
                                Save
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="550px">
                        <v-card>
                            <v-card-title class="headline">Are you sure you want to delete this product?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="error" text @click="deleteItemConfirm()" :loading="saveBtnLoading">OK</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar>
                    <div>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            class="hidden-md-and-up mx-4"
                        ></v-text-field>
                    </div>
                    </template>
                    <template v-slot:item.image="{ item }">
                        <span v-if="item.image">
                            <v-img :src="item.image" :lazy-src="item.image" :alt="item.name" style="width: 50px; height: auto">
                                <template v-slot:placeholder>
                                    <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                    >
                                        <v-progress-circular indeterminate color="primary lighten-1"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </span>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              small
                              class="mr-2"
                              @click="editItem(item)"
                              v-bind="attrs"
                              v-on="on"
                          >
                              mdi-pencil
                          </v-icon>
                        </template>
                        <span>Edit Product</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              small
                              @click="deleteItem(item)"
                              v-bind="attrs"
                              v-on="on"
                          >
                              mdi-delete
                          </v-icon>
                        </template>
                        <span>Delete Product</span>
                      </v-tooltip>
                    </template>
                    <template v-slot:no-data>
                    <v-btn
                        color="primary"
                        @click="initialize"
                    >
                        Reset
                    </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
        <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :color="snackbarColor"
        >
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios'
import User from '../Helpers/User.js'
  export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        tableLoader: false,
        saveBtnLoading: false,
        search: '',
        delete_id: 0,
        edit_id: 0,
        user_name: User.name(),
        role: User.role(),
        userid: User.id(),
        userToken: User.getToken(),
        multiLine: true,
        snackbar: false,
        message: '',
        snackbarColor: '',
        rules: [
            value => !value || value.size < 2000000 || 'Image Size Should be Less then 2MB',
        ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Image', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      products: [],
      selectedImage: '',
      storeSelectedImage: '',
      removePicture: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        description: '',
        price: 0,
        image: [],
      },
      defaultItem: {
        title: '',
        description: '',
        price: 0,
        image: [],
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        // Add a request interceptor
        axios.interceptors.request.use( (config) => {
            this.tableLoader = true;
            return config;
        }, (error) => {
            this.tableLoader = false;
            return Promise.reject(error);
        });
        // Add a response interceptor
        axios.interceptors.response.use( (response) =>{
            this.tableLoader = false;
            return response;
        }, (error) => {
            this.tableLoader = false;
            return Promise.reject(error);
        });
        axios.get('http://localhost:8000/api/auth/getAllProducts', { headers: {'Authorization': 'Bearer '+ this.userToken }})
        .then(res => {
            if(res.data.error){
                alert(res.data.error)
                console.log(res.data.error)
            }else{
                this.products = res.data.success
            }
        })
        .catch(err => console.log(err+' from save() axios catch'))
      },

      onImageSelected(event){
        const reader = new FileReader();
        reader.onload = ()=> {
          this.selectedImage = reader.result
        }
        if (event != undefined) {
          reader.readAsDataURL(event);
        }
        if(event == undefined){
          this.selectedImage = ''
        }
      },

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.image = null
        this.selectedImage = item.image
        this.edit_id = item.id
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.delete_id = item.id
        this.selectedImage = ''
        this.editedItem.image = null
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        // Add a request interceptor
          axios.interceptors.request.use( (config) => {
              this.saveBtnLoading = true;
              return config;
          }, (error) => {
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });
          // Add a response interceptor
          axios.interceptors.response.use( (response) =>{
              this.saveBtnLoading = false;
              return response;
          }, (error) => {
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });

          let formData = new FormData();
          formData.append('id', this.delete_id);
          axios.post('http://localhost:8000/api/auth/deleteProduct', formData,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer '+ this.userToken }})
          .then(res => {

              if(res.data.error){
                  console.log(res.data.error)
                  this.message = res.data.error
                  this.snackbarColor = 'error'
                  this.snackbar = true
                  this.editedItem.image = null
              }else{
                this.message = 'Product Deleted Successfully'
                this.snackbarColor = 'success'
                this.snackbar = true
                this.products = res.data.success
                this.editedItem.image = null
              }

              this.closeDelete()
          })
          .catch(err => console.log(err+' from save() axios catch'))
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.selectedImage = ''
          this.editedItem.image = null
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.selectedImage = ''
        this.editedItem.image = null
      },
      removeImage(){
        this.editedItem.image = null
        this.selectedImage = ''
        this.removePicture = true
      },
      save () {
        if (this.editedIndex > -1) {
          
          if(this.editedItem.title == '' && this.editedItem.price == 0)
          {
              alert("Product Title and Price Must be Fill up");
              return;
          }
          // Add a request interceptor
          axios.interceptors.request.use( (config) => {
              this.saveBtnLoading = true;
              return config;
          }, (error) => {
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });
          // Add a response interceptor
          axios.interceptors.response.use( (response) =>{
              this.saveBtnLoading = false;
              return response;
          }, (error) => {
              this.saveBtnLoading = false;
              return Promise.reject(error);
          });

          let formData = new FormData();
          formData.append('id', this.edit_id);
          formData.append('title', this.editedItem.title);
          formData.append('description', this.editedItem.description);
          formData.append('price', this.editedItem.price);
          if(this.editedItem.image != null){
            formData.append('image', this.editedItem.image);
          }else if(this.removePicture){
            formData.append('image', "remove");
          }
          formData.append('added_by', this.userid);
          formData.append('_method', 'PATCH');
          axios.post('http://localhost:8000/api/auth/updateProduct', formData,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer '+ this.userToken }})
          .then(res => {

              if(res.data.error){
                  console.log(res.data.error)
                  this.message = res.data.error
                  this.snackbarColor = 'error'
                  this.snackbar = true
                  this.editedItem.image = null
              }else{
                this.message = 'New Product Update Successfully'
                this.snackbarColor = 'success'
                this.snackbar = true
                this.products = res.data.success
                this.editedItem.image = null
                this.removePicture = false
              }

              this.close()
          })
          .catch(err => console.log(err+' from save() axios catch'))

        } else {
            if(this.editedItem.title == '' && this.editedItem.price == 0)
            {
                alert("Product Title and Price Must be Fill up");
                return;
            }
            // Add a request interceptor
            axios.interceptors.request.use( (config) => {
                this.saveBtnLoading = true;
                return config;
            }, (error) => {
                this.saveBtnLoading = false;
                return Promise.reject(error);
            });
            // Add a response interceptor
            axios.interceptors.response.use( (response) =>{
                this.saveBtnLoading = false;
                return response;
            }, (error) => {
                this.saveBtnLoading = false;
                return Promise.reject(error);
            });

            let formData = new FormData();
            formData.append('title', this.editedItem.title);
            formData.append('description', this.editedItem.description);
            formData.append('price', this.editedItem.price);
            formData.append('image', this.editedItem.image);
            formData.append('added_by', this.userid);
            axios.post('http://localhost:8000/api/auth/createProduct', formData,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer '+ this.userToken }})
            .then(res => {

                if(res.data.error){
                    console.log(res.data.error)
                    this.message = res.data.error
                    this.snackbarColor = 'error'
                    this.snackbar = true
                    this.editedItem.image = null
                }else{
                  this.message = 'New Product Added Successfully'
                  this.snackbarColor = 'success'
                  this.snackbar = true
                  this.products = res.data.success
                  this.editedItem.image = null
                }

                this.close()
            })
            .catch(err => console.log(err+' from save() axios catch'))
        }
            
      }
    },
  }
</script>