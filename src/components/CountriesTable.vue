<template>
    <el-table
        :data="getAllCountries"
        :default-sort = "{ prop: 'name', order: 'ascending' }"
        style="width: 100%"
        stripe>
        <el-table-column label="Code" prop="code" width="90px" sortable>
            <template slot-scope="scope">
                <div v-if="isRowInEditMode(scope)">
                    <el-input
                        @keyup.enter.native="submitEdit(scope.row)"
                        @keyup.escape.native="exitEditMode"
                        placeholder="Code"
                        v-model="codeInput"
                        ref="codeInput">
                    </el-input>
                </div>
                <span v-else>{{ scope.row.code }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" sortable>
            <template slot-scope="scope">
                <div v-if="isRowInEditMode(scope)">
                    <el-input
                        @keyup.enter.native="submitEdit(scope.row)"
                        @keyup.escape.native="exitEditMode"
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
                    :disabled="!isRowInEditMode(scope) && isInEditMode"
                    :class="{ 'el-button--primary' : isRowInEditMode(scope) }"
                    size="mini">
                    <i class="el-icon-edit"></i> {{ isRowInEditMode(scope) ? 'Submit' : 'Edit' }}
                </el-button>
                <el-button
                    @click="openDeleteConfirmModal(scope.row)"
                    :disabled="isInEditMode"
                    type="danger"
                    size="mini">
                    Delete
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    export default {
      name: 'CountriesTable',
      data() {
        return {
          codeInput: '',
          nameInput: '',
          editingCountryCode: '',
          validationErrors: []
        }
      },
      computed: {
        ...mapState([ 'isInEditMode' ]),
        ...mapGetters([ 'getAllCountries' ]),
      },
      methods: {
        openDeleteConfirmModal({ code,name }) {
          this.$confirm(`Are you sure you want to delete ${name}?`, 'Warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('deleteCountry', code);
            this.$message.success('Delete completed');
          }).catch(() => {
            this.$message.info('Delete canceled');
          });
        },
        onClickEdit({ code, name }) {
          // code and name are the ORIGINAL data (not the bound data)
          this.ensureCodeFieldFocused();
          this.$store.dispatch('setIsInEditMode', true);
          this.setToggleEditingCountryCode(code);

          if (!this.editingCountryCode) { // submitting
            this.submitEdit({ code, name }, true);
            return;
          }
          this.codeInput = code;
          this.nameInput = name;
        },
        submitEdit(originalData, isFromEditButtonClick = false) {
          const originalCode = originalData.code;
          const originalName = originalData.name;
          // ...validation guard clauses...
          if (this.isNoChangeToData(originalCode, originalName)) {
            // no need to re-submit identical data (save server resources)
            this.exitEditMode();
            return;
          }
          this.validateChanges(originalCode, originalName);
          if (this.isValidationErrors()) {
            if (isFromEditButtonClick) {
              // maintains edit mode
              this.setToggleEditingCountryCode(originalCode);
            }
            this.$message.error(this.validationErrors[0]);
            this.validationErrors = [];
            return;
          }
          // ...passed validation...
          this.$store.dispatch('submitCountryEdit', {
            originalCode,
            code: this.codeInput,
            name: this.nameInput
          });
          this.exitEditMode();
        },
        validateChanges(originalCode, originalName) {
          const _isCodeNotTwoCharacters = () => this.codeInput.length !== 2;
          const _isCodeAlreadyUsed = (newCode) => {
            const isCodeUsed = !!this.getAllCountries.find(country => country.code === newCode);
            return isCodeUsed && (newCode !== originalCode);
          };
          const _isNameAlreadyUsed = (newName) => {
            const isNameUsed = !!this.getAllCountries.find(country => country.name === newName);
            return isNameUsed && (newName !== originalName)
          };
          if (_isCodeNotTwoCharacters(this.codeInput)) {
            this.validationErrors.push('Country code must be two characters in length.');
          }
          if (_isCodeAlreadyUsed(this.codeInput)) {
            this.validationErrors.push(`${this.codeInput} is already in use. Codes must be unique.`);
          }
          if (_isNameAlreadyUsed(this.nameInput)) {
            this.validationErrors.push(`${this.nameInput} is already in use. Country names must be unique.`);
          }
        },
        isValidationErrors() {
          return !!this.validationErrors.length;
        },
        isRowInEditMode(scope) {
          return (scope.row.code === this.editingCountryCode);
        },
        setToggleEditingCountryCode(code) {
          this.editingCountryCode = ((!this.editingCountryCode) ? code : '');
        },
        isNoChangeToData(originalCode, originalName) {
          const isNoChangeToCode = (originalCode === this.codeInput);
          const isNoChangeToName = (originalName === this.nameInput);
          return isNoChangeToCode && isNoChangeToName;
        },
        ensureCodeFieldFocused() {
          // This is admittedly ugly when mixed with Element UI
          setTimeout(() => {
            const codeInputElement = this.$refs.codeInput;
            if (codeInputElement) {
              codeInputElement.$el.children[0].focus();
            }
          }, 1);
        },
        exitEditMode() {
          this.$store.dispatch('setIsInEditMode', false);
          this.editingCountryCode = '';
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>