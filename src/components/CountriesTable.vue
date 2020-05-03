<template>
    <el-table :data="getAllCountries" :default-sort = "{ prop: 'name', order: 'ascending' }" style="width: 100%" stripe>
        <el-table-column label="Code" prop="code" width="90px" sortable>
            <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" sortable>
            <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Operations" align="right" width="180px">
            <template slot-scope="scope">
                <el-button size="mini" @click="handlerToDo(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handlerToDo(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'CountriesTable',
      methods: {
        // ToDo
      },
      computed: {
        ...mapGetters([ 'getAllCountries' ]),
      }
    }
</script>

<style lang="scss" scoped>

</style>