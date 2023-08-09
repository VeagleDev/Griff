// Prevents additional console window on Windows in release, DO NOT REMOVE!!
//#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::WindowEvent;
use tauri::api::process::{Command, CommandEvent};

fn main() {
    tauri::Builder::default()
        .on_window_event(|e| {
            if let WindowEvent::Resized(_) = e.event() {
                std::thread::sleep(std::time::Duration::from_nanos(1));
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");


}
