<?php

class Diagnosticos_model extends CI_Model
{
    private $mytable;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->mytable = 'diagnosticos';
    }
    
    public function get($id) {
        
        $query = $this->db->get_where($this->mytable, array('id'=>$id));
        
        if ((!is_null($query)) && ($query->num_rows()==1))
        {
            $row = $query->row();
            $row->id = (int)$row->id;
            $row->glucemia_alterada_en_ayunas = (bool)$row->glucemia_alterada_en_ayunas;
            $row->tolerancia_glucosa_alterada = (bool)$row->tolerancia_glucosa_alterada;
            $row->diabetes = (bool)$row->diabetes;
            $row->diabetes_tiempo_evolucion = (int)$row->diabetes_tiempo_evolucion;
            $row->diabetes_tipo = (int)$row->diabetes_tipo;
            $row->diabetes_semanas_gestacion = (int)$row->diabetes_semanas_gestacion;
            $row->hipertension_arterial = (bool)$row->hipertension_arterial;
            $row->hipertension_arterial_tiempo_evolucion = (int)$row->hipertension_arterial_tiempo_evolucion;
            $row->dislipemia = (bool)$row->dislipemia;
            $row->preclasificacion_rcvg = (int)$row->preclasificacion_rcvg;
            return $row;
        }
        else
        {
            return NULL;
        }
    }
    
    public function save($id) {
        
        $this->db->set('id', $id);
        
        $this->db->insert($this->mytable);
                
        if ($this->db->affected_rows() == 1) 
        {
            return TRUE;
        }        
        else {
            return FALSE;        
        }
    }
    
    public function update($id, $data) {
        
        $campo = $data['campo'];
        
        if ($this->db->field_exists($campo, $this->mytable)){
            
            $this->db->set($campo, $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $this->db->update($this->mytable);
            
            if ($this->db->affected_rows() == 1)
            {
                return TRUE;
            }
        }
        else
        {
            return FALSE;
        }
        
    }
    
}

