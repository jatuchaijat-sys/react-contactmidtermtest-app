function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "400px",
          width: "90%",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#fee2e2",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          !
        </div>

        <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#111827" }}>
          {title || "ยืนยันการทำรายการ"}
        </h3>

        <p
          style={{
            margin: "0 0 24px 0",
            color: "#6b7280",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {message || "คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?"}
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "white",
              color: "#374151",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ยืนยันลบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
