<template>
  <div class="flex p-2 mt-4">
    <div class="flex-grow me-2">
      <FloatLabel variant="in">
        <IconField>
          <InputText id="in_label" v-model="searchInputText" autocomplete="off" variant="filled" size="small"
            class="w-full" @keyup="searchKeyUp" />
        </IconField>
        <label for="in_label">Search term</label>
      </FloatLabel>
    </div>
    <div class="flex-none ms-2">
      <Button label="Search" @click="searchAction" />
      <Toast />
    </div>
  </div>

  <div class="grid grid-cols-12">
    <div class="p-2 col-span-7">
      <DataTable @page="onPage" :lazy="true" v-model:selection="emailItemSelected" selectionMode="single"
        dataKey="messageId" :totalRecords="totalRecords" :value="emailsData" :paginator="true" :rows="rows"
        :rowsPerPageOptions="[10, 20, 50]" :first="first">
        <Column field="subject" header="Subject"></Column>
        <Column field="from" header="From"></Column>
        <Column field="to" header="To">
          <template #body="slotProps">
            {{ toFormatter(slotProps.data.to) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="p-2 col-span-5">
      <div class="card">
        <Panel header="Detail">
          <div v-if="emailItemSelected" class="m-0">
            <ul>
              <li><span class="font-bold">Date:</span> {{ emailItemSelected.date }}</li>
              <li><span class="font-bold">Subject:</span> {{ emailItemSelected.subject }}</li>
              <li><span class="font-bold">Message:</span></li>
              <li>{{ emailItemSelected.body }}</li>
            </ul>
          </div>
          <div v-else class="m-5 text-center">
            No hay registros que coincidan con tu búsqueda
          </div>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EmailService from '../services/api/emailService';
import type { DataTablePageEvent } from 'primevue';
import EmailRequest from '../services/models/email-request';
import { EmailItem } from '../services/models/email-item';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const rows = ref(10);
const first = ref(0);
const page = ref(0);
const emailItemSelected = ref<EmailItem | null>();
const totalRecords = ref(0);
let emailsData = ref<EmailItem[]>([]);
const searchInputText = ref(null)
const emailService = new EmailService();



const searchKeyUp = (event: KeyboardEvent) => {
  //Validation enter key press for trigger server request
  if (event.key === 'Enter') {
    searchAction();
  }
  validateReloadAll();
}

const validateReloadAll = () => {
  const searchTerm: string | null = searchInputText.value;
  if (searchTerm != null && searchTerm.length == 0) {
    loadEmailData();
  }
}
const searchAction = () => {
  const searchTerm: string | null = searchInputText.value;
  if (searchTerm != null && searchTerm.trim().length > 0) {
    loadEmailData(searchInputText.value);
  } else {
    toast.add({ severity: 'info', summary: 'Info', detail: 'You must enter a term to search', life: 3000 })
  }
}

const onPage = (event: DataTablePageEvent) => {
  first.value = event.first;
  rows.value = event.rows;
  page.value = event.page;
  loadEmailData(searchInputText.value)
};

const loadEmailData = (queryTerm?: string | null) => {
  let emailRequest: EmailRequest = {
    page: page.value,
    size: rows.value,
    q: queryTerm
  };
  emailService.getEmailData(emailRequest).then((response) => {
    emailsData.value = response.data;
    totalRecords.value = response.total;
    const selectedItem = response.data && response.data.length ? response.data[0] : null;
    setSelectedItem(selectedItem);
  });
}

const setSelectedItem = (selectedItem: EmailItem | null) => {
  emailItemSelected.value = selectedItem;
}

const toFormatter = (toValues: string[]) => {
  return toValues.join(", ");
}

onMounted(() => {
  loadEmailData();
});

</script>
