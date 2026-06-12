<h1 align="center"> BackEnd </h1>

### App Info

- User akan mendapatkan token bare untuk login di api `register`

### Tech info

#### Api

```json
{
    "status": "success",
    "message": "Riwayat booking berhasil didapatkan",
    "data": [
        {
            "id": 12,
            "student_id": 1,
            "mentoring_id": 3,
            "order_id": "TRX-1749000000-1",
            "status": "paid",
            "snap_token": "xxxx-xxxx-xxxx",
            "created_at": "2026-06-12T12:00:00.000000Z",
            "updated_at": "2026-06-12T12:05:00.000000Z",
            "mentoring": {
                "id": 3,
                "title": "Bimbingan Intensif Aljabar Linear",
                "description": "Persiapan ujian tengah semester",
                "price": 150000,
                "start_time": "2026-06-15 13:00:00",
                "end_time": "2026-06-15 15:00:00",
                "status": "available"
            }
        }
    ]
}
```
