<?php

class Localidad_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
                
        $this->load->library('localidad');
    }
    
    public function get($id = null)
    {
        // Opcion para cargar todos los registros de LOCALIDAD
        if (is_null($id))
        {
            $localidades = $this->db->get('localidad');
            
            if ($localidades->num_rows() > 0)
            {
                return $localidades->custom_result_object('localidad');
            }
            else
            {
                return null;
            }
        }
        else //Opcion para cargar solo un regitro por medio del ID pasado desde el controller
        {
            $this->db->from('localidad');
            
            //$this->db->select('ID, DESCRIPCION, CODIGO_POSTAL, DEPARTAMENTO_ID');
            
            $this->db->where('id', $id);
            
            $localidad = $this->db->get();
            
            return $localidad->row();
        }
    }
    
    public function save($localidad)
    {
        $data = $this->_setLocalidad($localidad);
        
        $this->db->insert('localidad', $data);
        
        if ($this->db->affected_rows() == 1)
        {
            return $this->db->insert_id();
        }
        else 
        {
            return null;
        }
    }
    
    public function update($id, $data)
    {
        $this->db->where('id', $id);
        
        $this->db->update('localidad', $data);
        
        if ($this->db->affected_rows() == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    public function delete($id)
    {
        $this->db->where('id', $id);
        
        $this->db->delete('localidad');
        
        if ($this->db->affected_rows() == 1) return TRUE;
        else return FALSE;
    }
    
    public function _setLocalidad($localidad)
    {
        return array("DESCRIPCION" => $localidad['descripcion'],
                     "CODIGO_POSTAL" => $localidad['codigo_postal'],
                     "DEPARTAMENTO_ID" => $localidad['departamento_id']);
    }
    
}

