<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }



    /* Relasi ke tabel Mentorings melalui tabel pivot Bookings
     */
    public function mentorings(): BelongsToMany
    {
        return $this->belongsToMany(
            Mentoring::class, // Model tujuan
            'bookings',       // Nama tabel pivot/perantara Anda
            'student_id',     // Foreign key di tabel bookings yang merujuk ke tabel users
            'mentoring_id'    // Foreign key di tabel bookings yang merujuk ke tabel mentorings
        )->withPivot('id', 'order_id', 'status', 'snap_token') // Mengikutkan data transaksi booking
            ->withTimestamps();
    }
}
