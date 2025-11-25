<script setup>
import { reactive, ref } from 'vue';

// 1. Dữ liệu mẫu (Mock Data)
const list_hotels = reactive([
  { id: 1, name: 'Khách sạn A', address: 'Hà Nội', rating: 4.5, level: 1 },
  { id: 2, name: 'Khách sạn B', address: 'Đà Nẵng', rating: 4.0, level: 2 },
  { id: 3, name: 'Khách sạn C', address: 'Hồ Chí Minh', rating: 5.0, level: 3 }
]);

// Danh sách địa chỉ cho Select box (Bổ sung theo ảnh)
const locations = ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh', 'Cần Thơ', 'Hải Phòng'];

// State cho Form nhập liệu
const form = reactive({
  id: '', // Thêm ID để hiển thị
  name: '',
  address: '',
  rating: '',
  level: ''
});

const errors = reactive({
  name: '',
  address: '',
  rating: '',
  level: ''
});

const isEditMode = ref(false);

// Hàm Reset Form
const resetForm = () => {
  form.id = '';
  form.name = '';
  form.address = '';
  form.rating = '';
  form.level = '';
  
  errors.name = '';
  errors.address = '';
  errors.rating = '';
  errors.level = '';
  
  isEditMode.value = false;
};

// Logic Validate (Sửa lại validate address cho select)
const validateForm = () => {
  let isValid = true;
  errors.name = ''; errors.address = ''; errors.rating = ''; errors.level = '';

  if (!form.name) { errors.name = 'Tên khách sạn không được để trống'; isValid = false; }
  
  if (!form.address) { errors.address = 'Vui lòng chọn địa chỉ'; isValid = false; } // Validate select

  if (!form.rating) { errors.rating = 'Nhập điểm đánh giá'; isValid = false; } 
  else if (isNaN(form.rating) || Number(form.rating) <= 0) { errors.rating = 'Phải là số > 0'; isValid = false; }

  if (!form.level) { errors.level = 'Nhập xếp hạng'; isValid = false; } 
  else if (isNaN(form.level) || Number(form.level) <= 0) { errors.level = 'Phải là số > 0'; isValid = false; }

  return isValid;
};

// Logic Submit
const handleSubmit = () => {
  if (!validateForm()) return;

  if (isEditMode.value) {
    // Update
    const index = list_hotels.findIndex(item => item.id === form.id);
    if (index !== -1) {
      list_hotels[index] = { 
        ...list_hotels[index], 
        name: form.name, 
        address: form.address, 
        rating: Number(form.rating), 
        level: Number(form.level) 
      };
      alert("Cập nhật thành công!");
    }
  } else {
    // Create
    const maxId = list_hotels.length > 0 ? Math.max(...list_hotels.map(h => h.id)) : 0;
    const newHotel = {
      id: maxId + 1,
      name: form.name,
      address: form.address,
      rating: Number(form.rating),
      level: Number(form.level)
    };
    list_hotels.push(newHotel);
    alert("Thêm mới thành công!");
  }
  resetForm();
};

// Logic Xem/Sửa
const handleEdit = (hotel) => {
  form.id = hotel.id;
  form.name = hotel.name;
  form.address = hotel.address;
  form.rating = hotel.rating;
  form.level = hotel.level;
  isEditMode.value = true;
  
  // Tự động cuộn xuống form khi bấm sửa
  const formElement = document.getElementById('form-section');
  if(formElement) formElement.scrollIntoView({ behavior: 'smooth' });
};

// Logic Xóa
const handleDelete = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa khách sạn này không?")) {
    const index = list_hotels.findIndex(item => item.id === id);
    if (index !== -1) list_hotels.splice(index, 1);
  }
};
</script>

<template>
  <div class="container main-content">
    
    <div class="breadcrumb">
      <span>Trang chủ</span>
      <span>Tạo mới</span>
      <span>Chi tiết</span>
      <span>Chỉnh sửa</span>
    </div>

    <div class="card mb-4">
        <div class="card-header d-flex justify-between">
            <h3>Danh sách khách sạn</h3>
            <button class="btn btn-success btn-sm" @click="resetForm">Tạo mới</button>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th style="width: 50px;">ID</th>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Đánh giá</th>
                    <th>Chất lượng</th>
                    <th style="width: 140px;">Tương tác</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="hotel in list_hotels" :key="hotel.id">
                    <td>{{ hotel.id }}</td>
                    <td style="font-weight: 500;">{{ hotel.name }}</td>
                    <td>{{ hotel.address }}</td>
                    <td>{{ hotel.rating }}</td>
                    <td>{{ hotel.level }}</td>
                    <td>
                    <button @click="handleEdit(hotel)" class="btn btn-info text-white btn-sm">Xem</button>
                    <button @click="handleDelete(hotel.id)" class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
                <tr v-if="list_hotels.length === 0">
                    <td colspan="6" class="text-center">Không có dữ liệu</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="form-section" class="card">
      <div class="card-header">
        <h3>{{ isEditMode ? 'Cập nhật khách sạn' : 'Tạo mới khách sạn' }}</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          
          <div class="form-group">
            <label>ID:</label>
            <input v-model="form.id" type="text" class="form-control disabled-input" disabled placeholder="Tự động tạo" />
          </div>

          <div class="form-group">
            <label>Tên:</label>
            <input v-model="form.name" type="text" class="form-control" />
            <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label>Địa chỉ:</label>
            <select v-model="form.address" class="form-control">
                <option value="" disabled selected>- Lựa chọn -</option>
                <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
            </select>
            <span v-if="errors.address" class="error-text">{{ errors.address }}</span>
          </div>

          <div class="form-group">
            <label>Đánh giá:</label>
            <input v-model="form.rating" type="number" step="0.1" class="form-control" placeholder="0" />
            <span v-if="errors.rating" class="error-text">{{ errors.rating }}</span>
          </div>

          <div class="form-group">
            <label>Chất lượng:</label>
            <input v-model="form.level" type="number" class="form-control" placeholder="0" />
            <span v-if="errors.level" class="error-text">{{ errors.level }}</span>
          </div>

          <div class="form-actions text-center">
            <button type="submit" class="btn btn-success" v-if="!isEditMode">
              Tạo Mới
            </button>

            <button type="submit" class="btn btn-info text-white" v-if="isEditMode">
               Cập nhật
            </button>
            
            <button type="button" @click="resetForm" class="btn btn-secondary" v-if="isEditMode" style="margin-left: 10px">
              Hủy
            </button>
          </div>
          
          <div class="footer-sign">Thuyvt66</div>

        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px 15px;
  font-family: 'Segoe UI', sans-serif;
}

/* Breadcrumb */
.breadcrumb {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}
.breadcrumb span { cursor: pointer; }
.breadcrumb span:hover { color: #42b883; }

/* Card Styles */
.card {
  background: #fff;
  border: none; /* Bỏ border cho giống ảnh modern */
  margin-bottom: 30px;
}

.card-header h3, h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.d-flex { display: flex; }
.justify-between { justify-content: space-between; align-items: center; }
.mb-4 { margin-bottom: 1.5rem; }


/* Table Styles */
.table { width: 100%; border-collapse: collapse; background-color: #f8f9fa; }
.table th, .table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #dee2e6; }
.table th { background-color: #fff; font-weight: bold; border-top: none; }
.table tr:nth-child(odd) { background-color: #f2f2f2; }
.table tr:nth-child(even) { background-color: #fff; }

/* Form Styles */
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: 500; color: #555; font-size: 0.95rem; }
.form-control { width: 100%; padding: 8px 12px; border: 1px solid #ced4da; border-radius: 4px; box-sizing: border-box; }
.disabled-input { background-color: #e9ecef; cursor: not-allowed; }
.error-text { color: #dc3545; font-size: 0.8rem; margin-top: 3px; display: block; }

/* Button Styles */
.btn { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; transition: 0.2s; margin-right: 5px;}
.btn-sm { padding: 5px 10px; font-size: 0.85rem; }
.btn-success { background-color: #198754; color: white; } /* Màu xanh lá đậm giống ảnh */
.btn-info { background-color: #0dcaf0; color: white; } /* Màu xanh dương sáng giống ảnh */
.btn-danger { background-color: #dc3545; color: white; }
.btn-secondary { background-color: #6c757d; color: white; }
.text-white { color: white !important; }
.text-center { text-align: center; margin-top: 20px; }

.footer-sign { text-align: center; font-size: 0.8rem; color: #999; margin-top: 20px; }
</style>