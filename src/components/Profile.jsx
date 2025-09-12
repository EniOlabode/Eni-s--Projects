import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fetch user + profile from Supabase
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(prof);

        const { data: imgs } = await supabase
          .from("business_images")
          .select("*")
          .eq("profile_id", user.id)
          .order("uploaded_at", { ascending: false });
        setImages(imgs || []);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...profile,
    });
    setLoading(false);
    if (error) setErr(error.message);
  };

  // Upload profile picture
  const handleProfilePic = async (file) => {
    if (!user || !file) return;
    const path = `user-${user.id}/profile-${Date.now()}.${file.name.split(".").pop()}`;

    const { error } = await supabase.storage
      .from("profile-pics")
      .upload(path, file, { upsert: true });

    if (error) return setErr(error.message);

    const { data } = supabase.storage.from("profile-pics").getPublicUrl(path);
    const url = data.publicUrl;

    setProfile({ ...profile, profile_pic_url: url });

    await supabase.from("profiles").update({ profile_pic_url: url }).eq("id", user.id);
  };

  // Upload multiple business images
  const handleBusinessImages = async (files) => {
    if (!user || !files?.length) return;

    for (const file of files) {
      const path = `user-${user.id}/img-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("business-images")
        .upload(path, file);

      if (error) return setErr(error.message);

      const { data } = supabase.storage.from("business-images").getPublicUrl(path);
      const url = data.publicUrl;

      const { data: row } = await supabase
        .from("business_images")
        .insert({ profile_id: user.id, image_url: url })
        .select()
        .single();

      if (row) setImages((prev) => [row, ...prev]);
    }
  };

  const handlePasswordChange = async () => {
    const newPwd = prompt("Enter new password:");
    if (!newPwd) return;
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    if (error) alert(error.message);
    else alert("Password updated.");
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-3xl space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Business Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4">
          {profile.profile_pic_url ? (
            <img
              src={profile.profile_pic_url}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
            Upload Profile Picture
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleProfilePic(e.target.files[0])}
            />
          </label>
        </div>

        {/* Company Info */}
        <div className="border rounded-2xl bg-card shadow-sm p-6 space-y-4">
          <h3 className="text-xl font-semibold">Company Information</h3>
          <input
            type="text"
            name="company_name"
            value={profile.company_name || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            placeholder="Company Name"
          />
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            disabled
            className="w-full rounded-lg border p-3 bg-gray-50"
          />
          <input
            type="text"
            name="industry"
            value={profile.industry || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            placeholder="Industry"
          />
          <input
            type="text"
            name="zip"
            value={profile.zip || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            placeholder="ZIP"
          />
          <textarea
            name="description"
            value={profile.description || ""}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            rows={4}
            placeholder="Business description..."
          />
          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-full rounded-lg bg-primary text-primary-foreground py-2 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {err && <p className="text-sm text-red-600">{err}</p>}
        </div>

        {/* Business Images */}
        <div className="border rounded-2xl bg-card shadow-sm p-6 space-y-4">
          <h3 className="text-xl font-semibold">Business Images</h3>
          <div className="flex flex-wrap gap-3">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.image_url}
                alt="Business"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
          <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
            Upload Business Images
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleBusinessImages(Array.from(e.target.files))}
            />
          </label>
        </div>

        {/* Security */}
        <div className="border rounded-2xl bg-card shadow-sm p-6 space-y-4">
          <h3 className="text-xl font-semibold">Security</h3>
          <button
            onClick={handlePasswordChange}
            className="w-full rounded-lg bg-red-600 text-white py-2 hover:bg-red-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
};
