/* ==========================================================================
   Unified 16x16 Pixel-Art HUD SVG Icon Library
   Replaces inconsistent OS emojis across Forge, Kitchen, Town & Title HUDs
   ========================================================================== */

const HUD_PIXEL_ICONS={
 coin:'<path fill="#1e1510" d="M5 1h6v1h2v2h1v8h-1v2h-2v1H5v-1H3v-2H2V4h1V2h2z"/><path fill="#c47d1e" d="M5 2h6v1h2v10h-2v1H5v-1H3V3h2z"/><path fill="#f5c84c" d="M5 3h6v1h1v8h-1v1H5v-1H4V4h1z"/><path fill="#fff3b0" d="M5 4h2v2H5zM7 3h3v1H7z"/><path fill="#9c5c12" d="M7 5h2v6H7z"/><path fill="#ffe894" d="M8 5h1v5H8z"/>',
 star:'<path fill="#1e1510" d="M7 1h2v3h1v1h4v2h-1v1h-2v1h1v4h-2v-1H9v-1H7v1H6v1H4V9h1V8H3V7H2V5h4V4h1z"/><path fill="#d4881c" d="M7 2h2v4h4v1h-2v2h1v3h-2v-1H6v1H4V9h1V7H3V6h4z"/><path fill="#ffd84d" d="M7 3h2v3h3v1h-2v2h1v2H9v-1H7v1H5V9h1V7H4V6h3z"/><path fill="#fff6bd" d="M7 3h1v3H5v1h2v1h1z"/>',
 trophy:'<path fill="#1e1510" d="M3 1h10v2h2v4h-1v1h-2v1h-1v1H9v2h2v2H5v-2h2v-2H5V9H4V8H2V7H1V3h2z"/><path fill="#c9801e" d="M4 2h8v6h-1v1H9v3h1v1H6v-1h1V9H5V8H4zM2 4h2v3H2zM12 4h2v3h-2z"/><path fill="#f7ca48" d="M5 2h6v5h-1v1H6V7H5zM6 12h4v1H6z"/><path fill="#fff3b5" d="M6 3h2v3H6zM7 9h1v3H7z"/>',
 heart:'<path fill="#1e1510" d="M2 3h4v1h1v1h2V4h1V3h4v1h1v4h-1v2h-1v1h-1v1h-1v1H9v1H7v-1H6v-1H5v-1H4v-1H3V8H2V4h1z"/><path fill="#a82032" d="M3 4h3v1h1v1h2V5h1V4h3v4h-1v2h-1v1H9v1H7v-1H5v-1H4V8H3z"/><path fill="#e84355" d="M3 4h3v1h1v1h2V5h1V4h2v3h-1v2H9v2H7V9H5V7H4V5z"/><path fill="#ff9ca8" d="M4 5h2v2H4z"/>',
 heart_empty:'<path fill="#1e1510" d="M2 3h4v1h1v1h2V4h1V3h4v1h1v4h-1v2h-1v1h-1v1h-1v1H9v1H7v-1H6v-1H5v-1H4v-1H3V8H2V4h1z"/><path fill="#38343b" d="M3 4h3v1h1v1h2V5h1V4h3v4h-1v2h-1v1H9v1H7v-1H5v-1H4V8H3z"/><path fill="#524d57" d="M4 5h2v2H4z"/>',
 heart_sm:'<path fill="#1e1510" d="M2 4h4v1h1v1h2V5h1V4h4v4h-1v2h-2v2H9v1H7v-1H5v-2H3V8H2z"/><path fill="#ff5a76" d="M3 5h3v1h1v1h2V6h1V5h3v3h-1v2h-2v1H9v1H7v-1H6v-1H4V8H3z"/><path fill="#ffc2cf" d="M4 6h2v1H4z"/>',
 hourglass:'<path fill="#1e1510" d="M3 1h10v3h-1v2h-1v1h-1v2h1v1h1v2h1v3H3v-3h1v-2h1V9h1V7H5V6H4V4H3z"/><path fill="#a36b38" d="M4 2h8v1H4zM4 13h8v1H4z"/><path fill="#d9eef5" d="M5 4h6v2h-1v1H9v2h1v1h1v2H5v-2h1V9h1V7H6V6H5z"/><path fill="#f2c45a" d="M6 5h4v1H9v1H7V6H6zM7 8h2v2h1v2H6v-2h1z"/>',
 flame:'<path fill="#1e1510" d="M7 1h2v2h1v1h1v2h1v2h1v3h-1v2h-2v1H6v-1H4v-2H3V8h1V6h1V4h1V3h1z"/><path fill="#d9481e" d="M7 2h2v2h1v2h1v2h1v3h-1v2H5v-2H4V8h1V6h1V4h1z"/><path fill="#ff8f26" d="M7 4h2v2h1v2h1v3h-1v1H6v-1H5V8h1V6h1z"/><path fill="#ffe866" d="M7 7h2v2h1v2H6V9h1z"/><path fill="#fffbe0" d="M7 10h2v2H7z"/>',
 spring:'<path fill="#1e1510" d="M9 2h4v4h-1v2h-2v1H9v4h3v2H4v-2h3V9H6V8H4V6H3V3h4v1h1v2h1V4h1z"/><path fill="#4d8f38" d="M10 3h2v3h-1v1H9V5h1zM4 4h3v3H5V6H4z"/><path fill="#8ad45b" d="M10 3h1v2h-1zM5 4h2v2H5z"/><path fill="#62a844" d="M7 7h2v6H7z"/><path fill="#7a502c" d="M5 13h6v1H5z"/>',
 summer:'<path fill="#1e1510" d="M7 1h2v2H7zM7 13h2v2H7zM1 7h2v2H1zM13 7h2v2h-2zM3 3h2v2H3zM11 3h2v2h-2zM3 11h2v2H3zM11 11h2v2h-2zM5 4h6v1h1v6h-1v1H5v-1H4V5h1z"/><path fill="#f08c1e" d="M7 2h2v1H7zM7 13h2v1H7zM2 7h1v2H2zM13 7h1v2h-1zM5 5h6v6H5z"/><path fill="#ffd84d" d="M6 5h4v1h1v4h-1v1H6v-1H5V6h1z"/><path fill="#fff6bd" d="M6 6h2v2H6z"/>',
 autumn:'<path fill="#1e1510" d="M7 1h2v2h2V2h2v3h-1v2h2v2h-2v1h-2v1H9v3H7v-3H6v-1H4V9H2V7h2V5H3V2h2v1h2z"/><path fill="#b8421b" d="M7 2h2v2h3v1h-1v2h2v1h-2v2H9v1H7v-1H5V8H3V7h2V5H4V4h3z"/><path fill="#e87c24" d="M7 3h2v2h2v2H9v2H7V7H5V5h2z"/><path fill="#f7be44" d="M7 4h2v3H7z"/><path fill="#6b3e22" d="M7 11h2v2H7z"/>',
 winter:'<path fill="#1e1510" d="M7 1h2v2h2v1h-1v2h2V5h1v2h2v2h-2v2h-1v-1h-2v2h1v1H9v2H7v-2H5v-1h1v-2H4v1H3V9H1V7h2V5h1v1h2V4H5V3h2z"/><path fill="#5fa8d6" d="M7 2h2v12H7zM2 7h12v2H2zM4 4h2v2H4zM10 4h2v2h-2zM4 10h2v2H4zM10 10h2v2h-2z"/><path fill="#c7f0ff" d="M7 3h2v10H7zM3 7h10v2H3zM7 6h2v4H7z"/><path fill="#ffffff" d="M7 7h2v2H7z"/>',
 moon:'<path fill="#1e1510" d="M7 1h5v2h-1v1h-1v2h-1v4h1v2h1v1h1v2H7v-1H5v-1H4v-2H3V5h1V3h1V2h2z"/><path fill="#d4a030" d="M7 2h3v1H9v2H8v6h1v2h1v1H7v-1H5v-2H4V5h1V3h2z"/><path fill="#ffe47a" d="M6 3h2v2H7v6h1v2H6v-1H5V4h1z"/><path fill="#fff8cc" d="M6 4h1v3H6z"/>',
 sun:'<path fill="#1e1510" d="M7 1h2v2H7zM7 13h2v2H7zM1 7h2v2H1zM13 7h2v2h-2zM5 4h6v1h1v6h-1v1H5v-1H4V5h1z"/><path fill="#f5b82e" d="M5 5h6v6H5z"/><path fill="#ffe866" d="M6 5h4v1h1v4h-1v1H6v-1H5V6h1z"/><path fill="#fffbe0" d="M6 6h2v2H6z"/>',
 town:'<path fill="#1e1510" d="M7 1h2v1h2v1h2v1h2v3h-1v7H2V7H1V4h2V3h2V2h2z"/><path fill="#b84c35" d="M7 2h2v1h2v1h2v1h1v1H2V5h1V4h2V3h2z"/><path fill="#de744b" d="M7 3h2v1h2v1H5V4h2z"/><path fill="#e8cfa0" d="M3 7h10v6H3z"/><path fill="#6e482b" d="M6 9h4v4H6z"/><path fill="#f7ca59" d="M4 8h2v2H4zM10 8h2v2h-2z"/>',
 home:'<path fill="#1e1510" d="M7 1h2v1h2v1h2v1h2v3h-1v7H2V7H1V4h2V3h2V2h2z"/><path fill="#c45c38" d="M7 2h2v1h2v1h2v2H3V4h2V3h2z"/><path fill="#f0d9ad" d="M4 7h8v6H4z"/><path fill="#7a4c28" d="M7 9h2v4H7z"/>',
 shop:'<path fill="#1e1510" d="M2 2h12v5h-1v7H3V7H2z"/><path fill="#d44b3b" d="M3 3h2v3H3zM7 3h2v3H7zM11 3h2v3h-2z"/><path fill="#fff0c7" d="M5 3h2v3H5zM9 3h2v3H9z"/><path fill="#8f5d32" d="M4 7h8v6H4z"/><path fill="#f2c45a" d="M5 8h6v3H5z"/>',
 book:'<path fill="#1e1510" d="M2 2h12v12H2z"/><path fill="#8c3b2b" d="M3 3h10v10H3z"/><path fill="#b8563c" d="M5 3h7v9H5z"/><path fill="#f2e2b8" d="M4 11h9v2H4z"/><path fill="#f5ca5a" d="M7 5h4v2H7zM6 8h5v1H6z"/>',
 skill:'<path fill="#1e1510" d="M7 1h2v3h2v1h3v2h-3v1h-1v2h1v3H9v-1H7v1H5v-3h1V8H5V7H2V5h3V4h2z"/><path fill="#f5b82e" d="M7 2h2v3h4v2H9v4H7V7H3V5h4z"/><path fill="#fff4ad" d="M7 3h2v3h2v1H9v2H7V7H5V6h2z"/>',
 quest:'<path fill="#1e1510" d="M5 1h6v1h2v12H3V2h2z"/><path fill="#9c6a38" d="M4 3h8v10H4z"/><path fill="#f2e0b6" d="M5 4h6v8H5z"/><path fill="#c99b44" d="M6 2h4v2H6z"/><path fill="#6e4b2c" d="M6 6h4v1H6zM6 8h4v1H6zM6 10h3v1H6z"/>',
 check:'<path fill="#1e1510" d="M12 2h3v3h-1v1h-1v1h-1v1h-1v1h-1v1H9v1H8v1H7v1H5v-1H4v-1H3v-1H2V9H1V6h3v1h1v1h1v1h1V8h1V7h1V6h1V5h1V4h1z"/><path fill="#3db860" d="M12 3h2v2h-1v1h-1v1h-1v1h-1v1H9v1H8v1H7v1H5v-1H4v-1H3V9H2V7h2v1h1v1h1v1h1V9h1V8h1V7h1V6h1V5h1z"/><path fill="#9cf2ad" d="M12 4h1v1h-1zM10 6h1v1h-1zM8 8h1v1H8z"/>',
 sound_on:'<path fill="#1e1510" d="M6 2h3v12H6v-2H4v-1H2V5h2V4h2zM11 4h2v2h1v4h-1v2h-2v-2h1V6h-1z"/><path fill="#c49a52" d="M3 6h3v4H3zM6 4h2v8H6z"/><path fill="#ffe89c" d="M4 7h2v2H4zM6 5h1v6H6z"/><path fill="#8be0b0" d="M11 5h1v6h-1zM13 6h1v4h-1z"/>',
 sound_off:'<path fill="#1e1510" d="M6 2h3v12H6v-2H4v-1H2V5h2V4h2zM10 5h2v1h1V5h2v2h-1v2h1v2h-2v-1h-1v1h-2V9h1V7h-1z"/><path fill="#7c756c" d="M3 6h3v4H3zM6 4h2v8H6z"/><path fill="#e85858" d="M11 6h1v1h1V6h1v1h-1v2h1v1h-1V9h-1v1h-1V9h1V7h-1z"/>',
 ambient:'<path fill="#1e1510" d="M5 2h6v1h2v2h1v8h-4V8h2V5h-1V4H5v1H4v3h2v5H2V5h1V3h2z"/><path fill="#d4a048" d="M5 3h6v1H5zM4 4h1v4H4zM11 4h1v4h-1z"/><path fill="#6cc4b8" d="M3 9h2v3H3zM11 9h2v3h-2z"/><path fill="#bdf5ea" d="M3 9h1v2H3zM11 9h1v2h-1z"/>',
 friends:'<path fill="#1e1510" d="M4 2h4v4H7v1h2v1h1v5H2V8h1V7h1V6H4zM10 3h3v3h-1v1h2v6h-4V8h1V7h-1z"/><path fill="#f5ca92" d="M5 3h2v3H5zM10 4h2v2h-2z"/><path fill="#5a94c9" d="M3 8h6v4H3z"/><path fill="#88c2f0" d="M4 9h2v2H4z"/><path fill="#d98c4a" d="M10 8h3v4h-3z"/>',
 architect:'<path fill="#1e1510" d="M3 2h7v3H8v2h1v7H6V7h1V5H3zM11 3h3v11h-3z"/><path fill="#a8b8c4" d="M4 3h5v1H4z"/><path fill="#e3f0f7" d="M4 3h3v1H4z"/><path fill="#c48342" d="M7 5h1v8H7z"/><path fill="#f2c45a" d="M12 4h1v9h-1z"/>',
 save:'<path fill="#1e1510" d="M2 2h10v1h1v1h1v10H2z"/><path fill="#4a7099" d="M3 3h8v1h1v9H3z"/><path fill="#e8e4d5" d="M5 3h5v4H5z"/><path fill="#38506b" d="M8 4h1v2H8z"/><path fill="#f2e6c9" d="M4 9h8v4H4z"/><path fill="#b89860" d="M5 10h6v1H5z"/>',
 chest:'<path fill="#1e1510" d="M1 3h14v11H1z"/><path fill="#8f5428" d="M2 4h12v9H2z"/><path fill="#bf793d" d="M2 4h12v3H2z"/><path fill="#5e3619" d="M2 7h12v2H2z"/><path fill="#f0c451" d="M6 6h4v4H6zM2 4h1v9H2zM13 4h1v9h-1z"/><path fill="#fff3b5" d="M7 7h2v2H7z"/>',
 carrot:'<path fill="#1e1510" d="M10 1h3v2h2v3h-3v1h-1v2h-1v1H9v1H8v1H7v1H6v1H3v-3h1v-1h1V9h1V8h1V7h1V6h1V4h1z"/><path fill="#58a842" d="M11 2h2v2h-2zM12 4h2v1h-2z"/><path fill="#e87024" d="M9 5h2v2h-1v2H9v1H8v1H7v1H6v1H4v-2h1v-1h1V9h1V8h1V7h1z"/><path fill="#ffa447" d="M8 6h2v1H8zM6 9h2v1H6z"/>',
 chef:'<path fill="#1e1510" d="M4 2h3v1h2V2h3v1h2v4h-1v2h-1v5H4V9H3V7H2V3h2z"/><path fill="#f5f0e1" d="M4 3h8v5H4zM3 4h10v3H3zM5 9h6v4H5z"/><path fill="#d4ccb8" d="M5 8h6v1H5zM5 12h6v1H5z"/>',
 scroll:'<path fill="#1e1510" d="M3 1h10v2h1v9h-2v2H2v-2h1V3H2V1z"/><path fill="#c9a05c" d="M3 2h10v1H3zM3 12h8v1H3z"/><path fill="#f5e3ba" d="M4 3h8v9H4z"/><path fill="#8c6239" d="M5 5h6v1H5zM5 7h6v1H5zM5 9h4v1H5z"/><path fill="#c93838" d="M9 9h2v2H9z"/>',
 news:'<path fill="#1e1510" d="M2 2h12v12H2z"/><path fill="#e8dec4" d="M3 3h10v10H3z"/><path fill="#4a5866" d="M4 4h8v2H4z"/><path fill="#7c8791" d="M4 7h4v4H4zM9 7h3v1H9zM9 9h3v1H9zM9 11h3v1H9z"/>',
 landmark:'<path fill="#1e1510" d="M7 1h2v1h2v1h2v1h2v2h-1v6h1v2H1v-2h1V6H1V4h2V3h2V2h2z"/><path fill="#d9c698" d="M7 2h2v1h2v1h2v1H3V4h2V3h2zM2 12h12v1H2z"/><path fill="#b8a172" d="M3 6h2v6H3zM7 6h2v6H7zM11 6h2v6h-2z"/><path fill="#fff2cc" d="M4 6h1v6H4zM8 6h1v6H8z"/>',
 fish:'<path fill="#1e1510" d="M6 3h5v1h2v2h2v4h-2v2h-2v1H6v-1H4v-1H2v1H1V4h1v1h2V4h2z"/><path fill="#4b8ec2" d="M6 4h5v1h2v2h1v2h-1v2h-2v1H6v-1H4V5h2zM2 6h2v4H2z"/><path fill="#85c7f2" d="M6 5h5v2H6z"/><path fill="#1e1510" d="M11 6h1v1h-1z"/>',
 fishing:'<path fill="#1e1510" d="M11 1h3v2h-1v2h-1v2h-1v2h-1v2H9v3H7v-3h1V9h1V7h1V5h1V3h1zM3 6h2v4H4v3H2v-3h1z"/><path fill="#a36d3b" d="M12 2h1v2h-1v2h-1v2h-1v2H9v3H8v-3h1V8h1V6h1V4h1z"/><path fill="#e84848" d="M3 7h2v2H3z"/><path fill="#ffffff" d="M3 9h2v1H3z"/><path fill="#8fd4f5" d="M2 11h4v1H2z"/>',
 pickaxe:'<path fill="#1e1510" d="M4 2h8v2h2v3h-2V6h-1v1H9v1H8v2H7v2H6v2H4v-2h1v-2h1V8h1V6H6V5H4V4H2V2z"/><path fill="#9eb0bf" d="M4 3h8v2h1v1h-2V5H8v1H7V5H5V4H4z"/><path fill="#dce9f2" d="M5 3h5v1H5z"/><path fill="#9c6434" d="M8 6h1v2H8v2H7v2H6v1H5v-2h1V9h1V7h1z"/>',
 sword:'<path fill="#1e1510" d="M11 1h4v4h-1v1h-1v1h-1v1h-1v1h-1v1h1v2H9v-1H8v1H7v1H6v1H4v-1H3v-1H2v-2h1v-1h1V9h1V8H4V6h2v1h1V6h1V5h1V4h1V3h1z"/><path fill="#b8c9d6" d="M12 2h2v2h-1v1h-1v1h-1v1h-1v1H9v1H8V8h1V7h1V6h1V5h1V4h1V3z"/><path fill="#eef7fc" d="M12 2h1v2h-1v1h-1v1h-1v1H9v1H8V7h1V6h1V5h1V4h1z"/><path fill="#e3b142" d="M5 7h2v1h1v1h1v2H8v-1H7V9H6V8H5z"/><path fill="#7a4c28" d="M4 10h2v2H4zM3 11h2v2H3z"/>',
 shield:'<path fill="#1e1510" d="M3 1h10v8h-1v2h-1v1h-1v1H9v1H7v-1H6v-1H5v-1H4V9H3z"/><path fill="#5d7894" d="M4 2h8v7h-1v2H9v1H7v-1H5V9H4z"/><path fill="#8aa8c7" d="M5 3h3v7H6V9H5z"/><path fill="#f2c45a" d="M7 3h2v8H7zM5 5h6v2H5z"/>',
 gem:'<path fill="#1e1510" d="M4 2h8v1h1v1h1v3h-1v1h-1v1h-1v1h-1v1H9v1H7v-1H6v-1H5V9H4V8H3V7H2V4h1V3h1z"/><path fill="#38a6d6" d="M5 3h6v1h2v3h-1v1h-1v1h-1v1H9v1H7v-1H6V9H5V8H4V7H3V4h2z"/><path fill="#8be8ff" d="M5 4h3v3H4V5h1zM8 4h3v1H8z"/><path fill="#e3fbff" d="M5 4h2v2H5z"/>',
 bolt:'<path fill="#1e1510" d="M7 1h5v2h-1v2h-1v1h3v2h-1v1h-1v1h-1v1H9v1H8v2H5v-2h1v-2h1V9H4V7h1V6h1V4h1z"/><path fill="#f5b82e" d="M8 2h3v2h-1v2H9v1h3v1h-1v1h-1v1H9v1H8v2H6v-2h1V9h1V8H5V7h1V6h1V4h1z"/><path fill="#fff4ad" d="M8 3h2v2H9v2H7V6h1z"/>',
 leaf:'<path fill="#1e1510" d="M8 2h6v5h-1v2h-1v1h-2v1H8v1H6v2H4v-2h1v-1H4V9H3V6h1V4h2V3h2z"/><path fill="#4e9e42" d="M8 3h5v4h-1v2h-2v1H7V9H5V6h1V4h2z"/><path fill="#8ee06c" d="M8 4h4v2h-1v1H8V6H7V5h1z"/><path fill="#336e2c" d="M5 10h2v2H5z"/>',
 test:'<path fill="#1e1510" d="M5 1h6v2h-1v3h1v1h1v2h1v4h-1v1H4v-1H3V9h1V7h1V6h1V3H5z"/><path fill="#d8edf5" d="M7 3h2v4H7zM6 7h4v1H6z"/><path fill="#52c982" d="M5 8h6v1h1v4H4V9h1z"/><path fill="#a3ffbe" d="M6 9h2v2H6z"/>',
 play:'<path fill="#1e1510" d="M3 2h3v1h2v1h2v1h2v1h1v4h-1v1h-2v1H8v1H6v1H3z"/><path fill="#f0b83a" d="M4 3h2v1h2v1h2v1h2v4h-2v1H8v1H6v1H4z"/><path fill="#fff0a6" d="M5 4h2v1h2v1H5z"/>',
 lock:'<path fill="#1e1510" d="M5 1h6v2h1v4h2v7H2V7h2V3h1zM6 3v4h4V3z"/><path fill="#9aa8b5" d="M5 2h6v1h1v4h-2V3H6v4H4V3h1z"/><path fill="#c48b3b" d="M3 8h10v5H3z"/><path fill="#f2c45a" d="M4 9h8v3H4z"/><path fill="#2b211a" d="M7 10h2v2H7z"/>',
 mood_warn:'<path fill="#1e1510" d="M4 2h8v1h1v1h1v8h-1v1h-1v1H4v-1H3v-1H2V4h1V3h1z"/><path fill="#e8a832" d="M4 3h8v1h1v8h-1v1H4v-1H3V4h1z"/><path fill="#ffd966" d="M5 4h6v3H5z"/><path fill="#2b1b14" d="M5 6h2v2H5zM9 6h2v2H9zM5 10h6v1H5z"/>',
 mood_angry:'<path fill="#1e1510" d="M4 2h8v1h1v1h1v8h-1v1h-1v1H4v-1H3v-1H2V4h1V3h1z"/><path fill="#d93838" d="M4 3h8v1h1v8h-1v1H4v-1H3V4h1z"/><path fill="#ff6e59" d="M5 4h6v2H5z"/><path fill="#2b1414" d="M4 5h2v1h1v2H5V6H4zM10 5h2v1h-1v2H9V6h1zM5 10h6v2H5z"/><path fill="#fff0d1" d="M6 11h4v1H6z"/>',
 puzzle:'<path fill="#1e1510" d="M5 2h4v2h4v4h-1v2h1v4H3V4h2z"/><path fill="#e3a83b" d="M6 3h2v2h4v2h-1v3h1v3H4V5h2z"/><path fill="#ffe485" d="M5 6h3v2H5z"/>',
 dish:'<path fill="#1e1510" d="M5 2h2v3H5zM9 2h2v3H9zM1 7h14v3h-1v2h-2v2H4v-2H2v-2H1z"/><path fill="#e8dfc8" d="M2 8h12v2h-1v2H3v-2H2z"/><path fill="#d97236" d="M4 8h8v2H4z"/><path fill="#f7c85c" d="M5 12h6v1H5z"/>',
 medal:'<path fill="#1e1510" d="M4 1h8v5h-1v1h1v4h-1v2H9v1H7v-1H5v-2H4V7h1V6H4z"/><path fill="#c93842" d="M5 2h6v4H5z"/><path fill="#f5c84c" d="M5 7h6v4h-1v2H6v-2H5z"/><path fill="#fff3b5" d="M6 8h2v2H6z"/>',
 palette:'<path fill="#1e1510" d="M5 2h6v1h2v2h1v5h-2v2h-2v1H5v-1H3v-2H2V5h1V3h2z"/><path fill="#d4a36a" d="M5 3h6v1h2v5h-2v2H5v-1H3V5h2z"/><path fill="#e84848" d="M5 4h2v2H5z"/><path fill="#4b94e8" d="M9 4h2v2H9z"/><path fill="#58b84e" d="M4 7h2v2H4z"/><path fill="#ffd84d" d="M7 8h2v2H7z"/>',
 bag:'<path fill="#1e1510" d="M5 2h6v2h2v2h1v7h-1v1H3v-1H2V6h1V4h2z"/><path fill="#8c542c" d="M5 3h6v2h2v8H3V5h2z"/><path fill="#b87642" d="M4 6h8v3H4z"/><path fill="#f0c451" d="M7 7h2v3H7z"/>'
};

function pxIcon(name,cls=''){
 const body=HUD_PIXEL_ICONS[name];
 if(!body)return '';
 return '<svg class="px-ico px-ico-'+name+(cls?' '+cls:'')+'" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">'+body+'</svg>';
}

function pxSeasonIcon(seasonIdOrIndex){
 const ids=['spring','summer','autumn','winter'];
 const key=typeof seasonIdOrIndex==='number'?ids[seasonIdOrIndex]||ids[0]:(ids.includes(seasonIdOrIndex)?seasonIdOrIndex:'spring');
 return pxIcon(key);
}

function pxHearts(count,max=3,showEmpty=true){
 const filled=Math.max(0,Math.min(max,Number(count)||0));
 let out='';
 for(let i=0;i<filled;i++)out+=pxIcon('heart');
 if(showEmpty)for(let i=filled;i<max;i++)out+=pxIcon('heart_empty');
 return out;
}

const HUD_EMOJI_TO_PX={
 '💰':'coin','⭐':'star','🏆':'trophy','❤️':'heart','🖤':'heart_empty',
 '⏳':'hourglass','🔥':'flame','🌱':'spring','☀️':'summer','☀':'sun',
 '🍂':'autumn','❄️':'winter','❄':'winter','🌙':'moon','🏘':'town',
 '🏠':'home','🛒':'shop','📖':'book','📚':'book','🌟':'skill',
 '📋':'quest','✅':'check','🔊':'sound_on','🔇':'sound_off','🎧':'ambient',
 '👥':'friends','🏗':'architect','💾':'save','📦':'chest','🥕':'carrot',
 '👨‍🍳':'chef','📜':'scroll','📰':'news','🏛':'landmark','🐟':'fish',
 '🎣':'fishing','⛏':'pickaxe','⚔':'sword','🛡':'shield','💎':'gem',
 '⚡':'bolt','🌿':'leaf','🧪':'test','▶':'play','🔒':'lock',
 '🧩':'puzzle','🍽':'dish','🍲':'dish','🏅':'medal','🎨':'palette',
 '🎒':'bag','🎲':'bolt','🏰':'landmark','🔔':'star','⛲':'landmark',
 '👑':'trophy','🌸':'spring','🎉':'star','🌶':'flame','🥣':'dish','⚒':'architect'
};

function pxIconFor(emojiOrKey,cls=''){
 const key=HUD_PIXEL_ICONS[emojiOrKey]?emojiOrKey:HUD_EMOJI_TO_PX[emojiOrKey];
 return key?pxIcon(key,cls):emojiOrKey;
}

function hydrateHudPixelIcons(root){
 if(typeof document==='undefined')return;
 const scope=root||document;
 if(typeof scope.querySelectorAll!=='function')return;
 scope.querySelectorAll('[data-px]').forEach(el=>{
  const key=el.getAttribute('data-px');
  if(!key||el.dataset.pxDone==='1')return;
  const svg=pxIcon(key);
  if(svg){el.outerHTML=svg;}
 });
 const homeAlbum=typeof document.getElementById==='function'?document.getElementById('homeAlbum'):null;
 if(homeAlbum&&!homeAlbum.querySelector?.('.px-ico')){
  homeAlbum.innerHTML=pxIcon('book')+' 圖鑑館';
 }
}
if(typeof document!=='undefined'&&typeof document.addEventListener==='function'){
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>hydrateHudPixelIcons());
 else hydrateHudPixelIcons();
}
