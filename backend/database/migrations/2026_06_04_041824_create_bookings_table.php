<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            // Baris di bawah ini yang diubah:
            $table->foreignId('mentoring_id')->constrained('mentorings')->onDelete('cascade');
            
            $table->string('order_id')->unique(); 
            $table->enum('status', ['pending', 'paid', 'failed'])->default('pending'); 
            $table->string('snap_token')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
