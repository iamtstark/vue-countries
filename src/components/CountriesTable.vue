<template>
    <el-table :data="getAllCountries" :default-sort = "{ prop: 'name', order: 'ascending' }" style="width: 100%" stripe>
        <el-table-column label="Code" prop="code" width="90px" sortable>
            <template slot-scope="scope">
                <div v-if="getIsRowInEditMode(scope)">
                    <el-input
                        @keyup.enter.native="submitEdit(scope.row.code)"
                        placeholder="Code"
                        v-model="codeInput">
                    </el-input>
                </div>
                <span v-else>{{ scope.row.code }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" sortable>
            <template slot-scope="scope">
                <div v-if="getIsRowInEditMode(scope)">
                    <el-input
                        @keyup.enter.native="submitEdit(scope.row.name)"
                        placeholder="Country name"
                        v-model="nameInput">
                    </el-input>
                </div>
                <span v-else>{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Operations" align="right" width="200px">
            <template slot-scope="scope">
                <el-button
                    @click="onClickEdit(scope.row)"
                    :class="{ 'el-button--primary' : getIsRowInEditMode(scope) }"
                    size="mini">
                    <i class="el-icon-edit"></i> {{ getIsRowInEditMode(scope) ? 'Submit' : 'Edit' }}
                </el-button>
                <el-button size="mini" type="danger" @click="handlerToDo(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'CountriesTable',
      data() {
        return {
          codeInput: '',
          nameInput: '',
          editingCountryCode: ''
        }
      },
      methods: {
        getIsRowInEditMode(scope) {
          return (scope.row.code === this.editingCountryCode);
        },
        onClickEdit({ code, name }) {
          this.editingCountryCode = ((!this.editingCountryCode) ? code : ''); // toggle
          if (!this.editingCountryCode) {
            this.submitEdit(code);
            return;
          }
          this.codeInput = code;
          this.nameInput = name;
        },
        submitEdit(originalCode) {
          this.$store.dispatch('submitCountryEdit', {
            originalCode,
            code: this.codeInput,
            name: this.nameInput
          });
          this.editingCountryCode = '';
        }
      },
      computed: {
        ...mapGetters([ 'getAllCountries' ]),
      }
    }
</script>

<style lang="scss" scoped>

</style>